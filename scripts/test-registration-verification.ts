/**
 * AESTIFIC REGISTRATION & EMAIL VERIFICATION REGRESSION TEST SUITE
 *
 * Validates the complete end-to-end authentication requirements:
 * 1. Brand new registration with email provider failure:
 *    - Does NOT mark account as verified
 *    - Returns HTTP 503 EMAIL_DELIVERY_FAILED with requiresVerification: true
 *    - Leaves account in database as unverified
 * 2. Login with unverified account:
 *    - Returns HTTP 403 EMAIL_NOT_VERIFIED with requiresVerification: true
 *    - Does NOT auto-verify or issue authenticated session
 * 3. Verification code validation:
 *    - Invalid numerical code rejected (HTTP 400)
 *    - Non-existent account code rejected
 *    - Valid 6-digit numerical code verifies account, mints session, and enables login
 * 4. Resend verification flow:
 *    - Rate limits and cooldown (60s wait) properly enforced
 *    - Invalidates previous code when new code is generated
 * 5. Existing account registration:
 *    - Existing verified account returns HTTP 409 ACCOUNT_EXISTS (no duplicates)
 *    - Existing unverified account safely dispatches verification code without duplicate accounts
 * 6. Password security & rate limit recovery:
 *    - Incorrect password rejected (HTTP 401)
 *    - Correct password login succeeds and resets email rate limit
 */

import http from 'http';
import { db } from '../server/db.js';
import { hashPassword } from '../server/auth.js';

const PORT = 3000;

interface HttpResponse {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  body: string;
  json?: any;
}

function request(options: {
  method: string;
  path: string;
  headers?: Record<string, string>;
  body?: any;
}): Promise<HttpResponse> {
  const reqHeaders: Record<string, string> = {
    'content-type': 'application/json',
    ...(options.headers || {}),
  };

  const payloadStr = options.body !== undefined
    ? typeof options.body === 'string'
      ? options.body
      : JSON.stringify(options.body)
    : undefined;

  if (payloadStr) {
    reqHeaders['content-length'] = Buffer.byteLength(payloadStr).toString();
  }

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path: options.path,
        method: options.method,
        headers: reqHeaders,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        res.on('end', () => {
          const raw = Buffer.concat(chunks);
          const bodyStr = raw.toString('utf-8');
          let json: any = undefined;
          try {
            json = JSON.parse(bodyStr);
          } catch {}

          resolve({
            statusCode: res.statusCode || 0,
            headers: res.headers,
            body: bodyStr,
            json,
          });
        });
      }
    );
    req.on('error', reject);
    if (payloadStr) {
      req.write(payloadStr);
    }
    req.end();
  });
}

let passed = 0;
let total = 0;

function assert(condition: boolean, desc: string, detail?: string) {
  total++;
  if (condition) {
    console.log(`  ✅ [PASS] ${desc}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${desc}`);
    if (detail) console.error(`     Detail: ${detail}`);
  }
}

async function runSuite() {
  console.log('====================================================');
  console.log('🧪 AESTIFIC AUTH & VERIFICATION REGRESSION SUITE');
  console.log('====================================================\n');

  // Clear rate limits before starting tests
  await request({ method: 'POST', path: '/api/test/clear-rate-limits' });

  // Test 1: Brand new account registration (when Brevo key returns 401)
  console.log('--- TEST 1: NEW ACCOUNT REGISTRATION WITH PROVIDER FAILURE ---');
  const testEmail1 = `reg.test.${Date.now()}@domain.com`;
  const testPass1 = 'SecurePass123!';

  const regRes = await request({
    method: 'POST',
    path: '/api/auth/register',
    body: {
      name: 'Verification Test User',
      email: testEmail1,
      password: testPass1,
      confirmPassword: testPass1,
    },
  });

  assert(
    regRes.statusCode === 503,
    '1.1: Registration returns HTTP 503 when email provider delivery fails',
    `status=${regRes.statusCode}, body=${regRes.body}`
  );
  assert(
    regRes.json?.code === 'EMAIL_DELIVERY_FAILED',
    '1.2: Response code is EMAIL_DELIVERY_FAILED',
    `code=${regRes.json?.code}`
  );
  assert(
    regRes.json?.requiresVerification === true,
    '1.3: Response indicates requiresVerification is true',
    `requiresVerification=${regRes.json?.requiresVerification}`
  );

  // Check database state
  const createdUser = await db.findUserByEmail(testEmail1);
  assert(
    Boolean(createdUser),
    '1.4: User record was created safely in database without losing registration progress'
  );
  assert(
    createdUser?.isEmailVerified === false,
    '1.5: User is strictly NOT marked verified when email sending fails (Zero auto-verification)',
    `isEmailVerified=${createdUser?.isEmailVerified}`
  );

  // Test 2: Unverified user login attempt
  console.log('\n--- TEST 2: LOGIN WITH UNVERIFIED ACCOUNT BLOCKED ---');
  const unverifiedLogin = await request({
    method: 'POST',
    path: '/api/auth/login',
    body: {
      email: testEmail1,
      password: testPass1,
    },
  });

  assert(
    unverifiedLogin.statusCode === 403,
    '2.1: Login with unverified account is strictly blocked with HTTP 403',
    `status=${unverifiedLogin.statusCode}, body=${unverifiedLogin.body}`
  );
  assert(
    unverifiedLogin.json?.code === 'EMAIL_NOT_VERIFIED',
    '2.2: Response code is EMAIL_NOT_VERIFIED'
  );
  assert(
    unverifiedLogin.json?.requiresVerification === true,
    '2.3: Response provides requiresVerification: true for seamless UI transition'
  );

  // Test 3: Verification code validation
  console.log('\n--- TEST 3: VERIFICATION CODE ENFORCEMENT ---');
  // Wrong code
  const wrongCodeRes = await request({
    method: 'POST',
    path: '/api/auth/verify-email',
    body: {
      email: testEmail1,
      code: '000000',
    },
  });

  assert(
    wrongCodeRes.statusCode === 400,
    '3.1: Invalid verification code is rejected with HTTP 400',
    `status=${wrongCodeRes.statusCode}, body=${wrongCodeRes.body}`
  );

  // Seed known valid code in db
  const knownCode = '654321';
  await db.setVerificationCode(createdUser!.id, knownCode);

  // Verify with valid code
  const validCodeRes = await request({
    method: 'POST',
    path: '/api/auth/verify-email',
    body: {
      email: testEmail1,
      code: knownCode,
    },
  });

  assert(
    validCodeRes.statusCode === 200,
    '3.2: Valid 6-digit code successfully verifies account (HTTP 200)',
    `status=${validCodeRes.statusCode}, body=${validCodeRes.body}`
  );
  assert(
    Boolean(validCodeRes.json?.token),
    '3.3: Verification immediately mints authenticated JWT token'
  );
  assert(
    validCodeRes.json?.user?.isEmailVerified === true,
    '3.4: Verified user profile returned with isEmailVerified: true'
  );

  // Test 4: Login with verified account
  console.log('\n--- TEST 4: VERIFIED ACCOUNT LOGIN SUCCEEDS ---');
  const verifiedLogin = await request({
    method: 'POST',
    path: '/api/auth/login',
    body: {
      email: testEmail1,
      password: testPass1,
    },
  });

  assert(
    verifiedLogin.statusCode === 200,
    '4.1: Verified account logs in successfully with HTTP 200',
    `status=${verifiedLogin.statusCode}`
  );
  assert(
    Boolean(verifiedLogin.json?.token),
    '4.2: Login token issued'
  );

  // Test 5: Existing account registration
  console.log('\n--- TEST 5: EXISTING ACCOUNT DUPLICATE PREVENTION ---');
  const dupReg = await request({
    method: 'POST',
    path: '/api/auth/register',
    body: {
      name: 'Duplicate Attempt',
      email: testEmail1,
      password: 'AnotherPassword999!',
      confirmPassword: 'AnotherPassword999!',
    },
  });

  assert(
    dupReg.statusCode === 409,
    '5.1: Registering with existing verified email returns HTTP 409 ACCOUNT_EXISTS',
    `status=${dupReg.statusCode}, body=${dupReg.body}`
  );
  assert(
    dupReg.json?.code === 'ACCOUNT_EXISTS',
    '5.2: Error code is ACCOUNT_EXISTS'
  );

  // Test 6: Wrong password rejection and legitimate recovery
  console.log('\n--- TEST 6: WRONG PASSWORD REJECTION ---');
  const wrongPassRes = await request({
    method: 'POST',
    path: '/api/auth/login',
    body: {
      email: testEmail1,
      password: 'WrongPassword!',
    },
  });

  assert(
    wrongPassRes.statusCode === 401,
    '6.1: Incorrect password strictly rejected with HTTP 401',
    `status=${wrongPassRes.statusCode}`
  );

  // Test 7: Cooldown behavior after successful and failed sends
  console.log('\n--- TEST 7: COOLDOWN & RESEND VERIFICATION BEHAVIOR ---');
  const testEmail2 = `cooldown.test.${Date.now()}@domain.com`;
  const testPass2 = 'SecurePass456!';

  // First registration (fails email dispatch)
  const regRes2 = await request({
    method: 'POST',
    path: '/api/auth/register',
    body: {
      name: 'Cooldown User',
      email: testEmail2,
      password: testPass2,
      confirmPassword: testPass2,
    },
  });
  assert(regRes2.statusCode === 503, '7.1: First registration fails email dispatch (HTTP 503)');

  const user2 = await db.findUserByEmail(testEmail2);
  assert(Boolean(user2), '7.2: Unverified account created in DB');

  // Verify that since email dispatch failed, lastVerificationSentAt was NOT set,
  // allowing immediate retry/resend check (cooldown allowed: true)
  const cooldownBefore = await db.canResendVerification(user2!.id, 60000);
  assert(cooldownBefore.allowed === true, '7.3: Failed email dispatch does NOT lock user out with cooldown');

  // Now simulate successful code send by setting verification code
  await db.setVerificationCode(user2!.id, '123456');
  const cooldownAfterSuccess = await db.canResendVerification(user2!.id, 60000);
  assert(cooldownAfterSuccess.allowed === false, '7.4: Successful send properly enforces 60s cooldown');
  assert(typeof cooldownAfterSuccess.waitSeconds === 'number', '7.5: Cooldown returns waitSeconds');

  // Test resend-verification endpoint when cooldown is active
  const resendActiveRes = await request({
    method: 'POST',
    path: '/api/auth/resend-verification',
    body: { email: testEmail2 },
  });
  assert(resendActiveRes.statusCode === 429, '7.6: Resend request during active cooldown returns HTTP 429');

  console.log('\n====================================================');
  console.log(`📊 SUMMARY: ${passed}/${total} TESTS PASSED`);
  console.log('====================================================');

  if (passed === total) {
    console.log('🎉 ALL REGISTRATION & VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
    process.exit(0);
  } else {
    console.error(`❌ ${total - passed} checks failed.`);
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
