import type { ImageAnalyzer, ImageAnalyzerInput } from '../../application/ports/image-analyzer';
import { ApplicationError } from '../../shared/errors/application-error';
import type { VeganAssessment } from '../../domain/vegan-assessment';

export class MissingGroqApiKeyImageAnalyzer implements ImageAnalyzer {
  public async analyze(_input: ImageAnalyzerInput): Promise<VeganAssessment> {
    throw new ApplicationError(
      'GROQ_API_KEY não configurada. Defina a chave no arquivo .env para habilitar a análise.',
      503
    );
  }
}