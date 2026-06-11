"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const create_app_1 = require("../../src/infrastructure/http/create-app");
describe('POST /analyze-package-image', () => {
    it('returns the analysis result for an uploaded image', async () => {
        const analyze = jest.fn().mockResolvedValue({
            safeForVegans: false,
            verdict: 'unsafe',
            summary: 'Foi identificado leite em pó na embalagem.',
            confidence: 0.97,
            evidence: ['ingrediente: leite em pó']
        });
        const app = (0, create_app_1.createApp)({ imageAnalyzer: { analyze } });
        const response = await (0, supertest_1.default)(app)
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
        const app = (0, create_app_1.createApp)({
            imageAnalyzer: {
                analyze: jest.fn()
            }
        });
        const response = await (0, supertest_1.default)(app).post('/analyze-package-image');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'ApplicationError',
            message: 'Imagem obrigatória no campo multipart "image".'
        });
    });
});
