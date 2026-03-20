import { ClsCustomError } from '@/src/Shared/Domain/Entities/ClsCustomError';
import { Request, Response, NextFunction } from 'express';

export default function handlerError(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ClsCustomError) {
    res.status(err.statusCode).json(err);
    next();
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err });
  next();
}
