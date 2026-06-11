import { z } from 'zod';

export const veganAssessmentSchema = z.object({
  safeForVegans: z.boolean(),
  verdict: z.enum(['safe', 'unsafe']),
  summary: z.string().min(1),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string().min(1)).default([])
});

export type VeganAssessment = z.infer<typeof veganAssessmentSchema>;
