import { MissingGroqApiKeyImageAnalyzer } from '../../src/infrastructure/groq/missing-groq-api-key-image-analyzer';

describe('MissingGroqApiKeyImageAnalyzer', () => {
  it('rejects analysis with a friendly application error', async () => {
    const analyzer = new MissingGroqApiKeyImageAnalyzer();

    await expect(
      analyzer.analyze({
        buffer: Buffer.from('test'),
        mimeType: 'image/png',
        fileName: 'package.png'
      })
    ).rejects.toMatchObject({
      name: 'ApplicationError',
      statusCode: 503,
      message: 'GROQ_API_KEY não configurada. Defina a chave no arquivo .env para habilitar a análise.'
    });
  });
});