import type { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../../../shared/errors/application-error';
import { AnalyzePackageImageUseCase } from '../../../application/use-cases/analyze-package-image.usecase';

export class AnalyzePackageImageController {
  public constructor(private readonly useCase: AnalyzePackageImageUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        throw new ApplicationError('Imagem obrigatória no campo multipart "image".', 400);
      }

      const result = await this.useCase.execute({
        buffer: file.buffer,
        mimeType: file.mimetype,
        fileName: file.originalname
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
