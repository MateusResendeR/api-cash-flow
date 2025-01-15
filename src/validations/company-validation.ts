import { z } from 'zod';

export const createCompanyValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  document: z.string(),
  password: z.string(),
  level: z.string(),
  company_id: z.string(),
});