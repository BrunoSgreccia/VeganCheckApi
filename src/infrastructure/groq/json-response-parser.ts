import { z } from 'zod';
import { veganAssessmentSchema, type VeganAssessment } from '../../domain/vegan-assessment';

const rawResponseSchema = z.object({
  safeForVegans: z.boolean(),
  verdict: z.enum(['safe', 'unsafe']),
  summary: z.string(),
  confidence: z.number(),
  evidence: z.array(z.string()).default([])
});

function stripCodeFences(value: string): string {
  return value.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
}

export function parseVeganAssessmentResponse(responseText: string): VeganAssessment {
  const cleanedText = stripCodeFences(responseText);
  const parsedJson = JSON.parse(cleanedText) as unknown;
  const validated = rawResponseSchema.parse(parsedJson);

  return veganAssessmentSchema.parse(validated);
}
