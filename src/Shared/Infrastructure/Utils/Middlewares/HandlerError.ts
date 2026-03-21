import { ClsCustomError } from '@/src/Shared/Domain/Entities/ClsCustomError';
import { Request, Response, NextFunction } from 'express';
import { env } from '@/src/Shared/Infrastructure/ClsEnvironmentContainer';

export default function handlerError(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ClsCustomError) {
    if (env.NODE_ENV !== 'production') {
      console.error(err);
    }

    res.status(err.statusCode).json(err);
    return; // DETENER
  }

  console.error(err);

  res.status(500).json({
    message: 'Ocurrió un error interno, intente nuevamente más tarde',
    ok: false,
  });
}
