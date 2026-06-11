import 'dotenv/config';
import { appEnv } from './config/env';
import { GroqImageAnalyzer } from './infrastructure/groq/groq-image-analyzer';
import { MissingGroqApiKeyImageAnalyzer } from './infrastructure/groq/missing-groq-api-key-image-analyzer';
import { createApp } from './infrastructure/http/create-app';

const imageAnalyzer = appEnv.GROQ_API_KEY
  ? new GroqImageAnalyzer(appEnv)
  : new MissingGroqApiKeyImageAnalyzer();

const app = createApp({
  imageAnalyzer
});

app.listen(appEnv.PORT, () => {
  console.log(`Vegan Check API running on port ${appEnv.PORT}`);
});
