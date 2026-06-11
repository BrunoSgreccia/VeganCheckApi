"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const analyze_package_image_usecase_1 = require("../../src/application/use-cases/analyze-package-image.usecase");
describe('AnalyzePackageImageUseCase', () => {
    it('delegates the analysis to the image analyzer', async () => {
        const analyze = jest.fn().mockResolvedValue({
            safeForVegans: true,
            verdict: 'safe',
            summary: 'Sem indícios de ingredientes de origem animal.',
            confidence: 0.95,
            evidence: ['lista de ingredientes legível e sem derivados animais']
        });
        const analyzer = { analyze };
        const useCase = new analyze_package_image_usecase_1.AnalyzePackageImageUseCase(analyzer);
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
