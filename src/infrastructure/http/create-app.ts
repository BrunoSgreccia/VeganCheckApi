import express, { type Express } from 'express';
import multer from 'multer';
import type { ImageAnalyzer } from '../../application/ports/image-analyzer';
import { AnalyzePackageImageUseCase } from '../../application/use-cases/analyze-package-image.usecase';
import { AnalyzePackageImageController } from './controllers/analyze-package-image-controller';
import { errorHandler } from './middlewares/error-handler';
import { appEnv } from '../../config/env';
import { ApplicationError } from '../../shared/errors/application-error';

export interface CreateAppDependencies {
  imageAnalyzer: ImageAnalyzer;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: appEnv.MAX_IMAGE_SIZE_MB * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      callback(new ApplicationError('Only image files are allowed.', 400));
      return;
    }

    callback(null, true);
  }
});

export function createApp(dependencies: CreateAppDependencies): Express {
  const app = express();
  const controller = new AnalyzePackageImageController(
    new AnalyzePackageImageUseCase(dependencies.imageAnalyzer)
  );

  app.disable('x-powered-by');
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.post('/analyze-package-image', upload.single('image'), (req, res, next) => {
    void controller.handle(req, res, next);
  });

  app.use(errorHandler);

  return app;
}
