import type { ImageAnalyzer, ImageAnalyzerInput } from '../ports/image-analyzer';
import type { VeganAssessment } from '../../domain/vegan-assessment';

export class AnalyzePackageImageUseCase {
  public constructor(private readonly imageAnalyzer: ImageAnalyzer) {}

  public async execute(input: ImageAnalyzerInput): Promise<VeganAssessment> {
    return this.imageAnalyzer.analyze(input);
  }
}
