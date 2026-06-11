import type { VeganAssessment } from '../../domain/vegan-assessment';

export interface ImageAnalyzerInput {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
}

export interface ImageAnalyzer {
  analyze(input: ImageAnalyzerInput): Promise<VeganAssessment>;
}
