import Groq from 'groq-sdk';
import type { ImageAnalyzer, ImageAnalyzerInput } from '../../application/ports/image-analyzer';
import { buildVeganPackagingPrompt } from '../../application/prompts/vegan-packaging-prompt';
import { parseVeganAssessmentResponse } from './json-response-parser';
import type { AppEnv } from '../../config/env';
import type { VeganAssessment } from '../../domain/vegan-assessment';

export class GroqImageAnalyzer implements ImageAnalyzer {
  private readonly client: Groq;

  public constructor(private readonly env: AppEnv) {
    this.client = new Groq({ apiKey: env.GROQ_API_KEY });
  }

  public async analyze(input: ImageAnalyzerInput): Promise<VeganAssessment> {
    const imageDataUrl = `data:${input.mimeType};base64,${input.buffer.toString('base64')}`;

    const response = await this.client.chat.completions.create({
      model: this.env.GROQ_MODEL,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: buildVeganPackagingPrompt() },
            { type: 'image_url', image_url: { url: imageDataUrl } }
          ]
        }
      ]
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Groq returned an empty response.');
    }

    return parseVeganAssessmentResponse(content);
  }
}
