import { buildVeganPackagingPrompt } from '../../src/application/prompts/vegan-packaging-prompt';

describe('buildVeganPackagingPrompt', () => {
  it('describes the required JSON contract and vegan safety rules', () => {
    const prompt = buildVeganPackagingPrompt();

    expect(prompt).toContain('Responda exclusivamente com JSON válido');
    expect(prompt).toContain('"safeForVegans": boolean');
    expect(prompt).toContain('unsafe');
    expect(prompt).toContain('Se houver qualquer indício de proteína animal');
  });
});
