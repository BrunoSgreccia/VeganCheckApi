import type { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../../../shared/errors/application-error';

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof ApplicationError) {
    res.status(error.statusCode).json({
      error: error.name,
      message: error.message
    });
    return;
  }

  const message = error instanceof Error ? error.message : 'Unexpected server error';

  res.status(500).json({
    error: 'InternalServerError',
    message
  });
}
