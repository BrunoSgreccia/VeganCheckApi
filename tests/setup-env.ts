process.env.NODE_ENV = 'test';
process.env.GROQ_API_KEY = process.env.GROQ_API_KEY ?? 'test-groq-key';
process.env.GROQ_MODEL = process.env.GROQ_MODEL ?? 'test-vision-model';
process.env.PORT = process.env.PORT ?? '3000';
process.env.MAX_IMAGE_SIZE_MB = process.env.MAX_IMAGE_SIZE_MB ?? '10';
