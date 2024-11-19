import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_ENDPOINT: z.string().url().min(1),
    VITE_DEBUG_MODE: z.coerce.boolean(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true
})
