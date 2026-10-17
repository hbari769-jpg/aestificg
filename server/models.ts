// Centralized AI Model Configurations for Aestific
export interface ModelConfig {
  id: string;
  name: string;
  provider: 'Google' | 'Groq' | 'Exa' | 'OpenAI' | 'Anthropic' | 'Custom';
  underlyingModel: string;
  description: string;
  speed: string;
  context: string;
  role?: 'default' | 'coding_reasoning' | 'hard_tasks' | 'web_research' | 'image' | 'fallback';
  isDefault?: boolean;
}

export const GEMINI_MODELS = {
  // Ultra-fast, highly responsive flagship model for instant streaming and maximum capacity
  MAIN: "gemini-3.5-flash-lite",
  FAST: "gemini-3.1-flash-lite",
  PRO: "gemini-3.5-flash",
} as const;

// Production Google Image Generation Models (Nano Banana series)
export const IMAGE_MODELS = {
  DEFAULT: 'gemini-3.1-flash-lite-image',
  HIGH_QUALITY: 'gemini-3.1-flash-image',
} as const;

export const DEFAULT_IMAGE_MODEL_ID = IMAGE_MODELS.DEFAULT;

// Groq models for reasoning, coding specialist, and fallback
export const GROQ_MODELS = { REASONING: "openai/gpt-oss-120b", FALLBACK: "gemini-3.1-flash-lite", MAIN: "openai/gpt-oss-120b" } as const;

export const DEFAULT_MODEL_ID = GEMINI_MODELS.MAIN;
export const LOW_COST_MODEL_ID = GEMINI_MODELS.FAST;

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'aestific-core',
    name: 'Aestific Core',
    provider: 'Google',
    underlyingModel: 'gemini-3.1-flash-lite',
    description: 'Everyday speed & precision',
    speed: 'Ultra Fast',
    context: '1M Tokens',
    role: 'default',
    isDefault: true,
  },
  {
    id: 'aestific-reason',
    name: 'Aestific Reason',
    provider: 'Groq',
    underlyingModel: 'qwen/qwen3.8-27b',
    description: 'Deep logic, math & technical coding',
    speed: 'Fast',
    context: '128K Tokens',
    role: 'coding_reasoning',
  },
  {
    id: 'aestific-ultra',
    name: 'Aestific Ultra',
    provider: 'Google',
    underlyingModel: 'gemini-3.1-pro-preview',
    description: 'Hard multi-step research & system design',
    speed: 'Deep',
    context: '2M Tokens',
    role: 'hard_tasks',
  },
  {
    id: 'aestific-visual',
    name: 'Aestific Visual',
    provider: 'Google',
    underlyingModel: 'gemini-3.1-flash-lite-image',
    description: 'Photorealistic image generation',
    speed: 'Instant',
    context: 'Image Model',
    role: 'image',
  },
];

export function normalizeAndValidateModel(modelInput?: string | null): string {
  if (!modelInput || typeof modelInput !== "string") {
    return DEFAULT_MODEL_ID;
  }
  const clean = modelInput.trim().toLowerCase();
  if (clean === 'default' || clean === 'auto' || clean === 'aestific-core') {
    return 'gemini-3.1-flash-lite';
  }
  if (clean === 'aestific-ultra' || clean === 'ultra') {
    return 'gemini-3.1-pro-preview';
  }
  if (clean === 'aestific-reason' || clean === 'reason' || clean.includes('qwen')) {
    return 'qwen/qwen3.8-27b';
  }
  if (clean === 'aestific-visual' || clean === 'visual') {
    return IMAGE_MODELS.DEFAULT;
  }
  return DEFAULT_MODEL_ID;
}

export function normalizeAndValidateImageModel(modelInput?: string | null): string {
  return IMAGE_MODELS.DEFAULT;
}