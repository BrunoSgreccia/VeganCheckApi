import request from 'supertest';
import { createApp } from '../../src/infrastructure/http/create-app';
import type { ImageAnalyzer } from '../../src/application/ports/image-analyzer';

describe('POST /analyze-package-image', () => {
  it('returns the analysis result for an uploaded image', async () => {
    const analyze = jest.fn().mockResolvedValue({
      safeForVegans: false,
      verdict: 'unsafe',
      summary: 'Foi identificado leite em pó na embalagem.',
      confidence: 0.97,
      evidence: ['ingrediente: leite em pó']
    });

    const app = createApp({ imageAnalyzer: { analyze } as ImageAnalyzer });

    const response = await request(app)
      .post('/analyze-package-image')
      .attach('image', Buffer.from([0x89, 0x50, 0x4e, 0x47]), 'package.png');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      safeForVegans: false,
      verdict: 'unsafe',
      summary: 'Foi identificado leite em pó na embalagem.',
      confidence: 0.97,
      evidence: ['ingrediente: leite em pó']
    });
    expect(analyze).toHaveBeenCalledTimes(1);
  });

  it('rejects requests without an image', async () => {
    const app = createApp({
      imageAnalyzer: {
        analyze: jest.fn()
      } as unknown as ImageAnalyzer
    });

    const response = await request(app).post('/analyze-package-image');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'ApplicationError',
      message: 'Imagem obrigatória no campo multipart "image".'
    });
  });
});
