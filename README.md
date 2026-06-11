# Vegan Check API

API em Node.js para analisar imagens de embalagens e indicar se o produto é seguro para pessoas veganas.

## Requisitos

- Node.js 22+
- Uma chave de API da Groq

## Configuração

1. Copie `.env.example` para `.env`
2. Preencha `GROQ_API_KEY`
3. Instale as dependências com `npm install`
4. Inicie a API com `npm run dev`

## Endpoints

### `GET /health`
Retorna status da aplicação.

### `POST /analyze-package-image`
Recebe uma imagem no campo multipart `image` e devolve um diagnóstico em JSON.

Exemplo de resposta:

```json
{
  "safeForVegans": false,
  "verdict": "unsafe",
  "summary": "A embalagem apresenta indícios de proteína animal na lista de ingredientes.",
  "confidence": 0.91,
  "evidence": ["contém leite em pó"],
  "rawModelResponse": { "...": "..." }
}
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm test`
- `npm run typecheck`
