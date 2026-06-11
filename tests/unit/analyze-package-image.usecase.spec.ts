import { AnalyzePackageImageUseCase } from '../../src/application/use-cases/analyze-package-image.usecase';
import type { ImageAnalyzer } from '../../src/application/ports/image-analyzer';

describe('AnalyzePackageImageUseCase', () => {
  it('delegates the analysis to the image analyzer', async () => {
    const analyze = jest.fn().mockResolvedValue({
      safeForVegans: true,
      verdict: 'safe',
      summary: 'Sem indícios de ingredientes de origem animal.',
      confidence: 0.95,
      evidence: ['lista de ingredientes legível e sem derivados animais']
    });

    const analyzer: ImageAnalyzer = { analyze };
    const useCase = new AnalyzePackageImageUseCase(analyzer);
    const input = {
      buffer: Buffer.from('fake-image'),
      mimeType: 'image/png',
      fileName: 'package.png'
    };

    await expect(useCase.execute(input)).resolves.toEqual({
      safeForVegans: true,
      verdict: 'safe',
      summary: 'Sem indícios de ingredientes de origem animal.',
      confidence: 0.95,
      evidence: ['lista de ingredientes legível e sem derivados animais']
    });

    expect(analyze).toHaveBeenCalledWith(input);
  });
});
