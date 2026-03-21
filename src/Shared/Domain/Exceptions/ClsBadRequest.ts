import { ClsCustomError } from '../Entities/ClsCustomError';

/**
 * Clase Bad Request params
 * @property {string} message - Mensaje de Error
 * @property {unknown} details - Detalles adicionales sobre el error
 */
export class ClsBadRequest extends ClsCustomError {
  public constructor({
    ok,
    message,
    details,
  }: {
    ok: boolean;
    message: string;
    details?: Record<string, unknown>;
  }) {
    super({
      statusCode: 400,
      message: message || 'Bad Request',
      details,
      name: 'BadRequest',
      ok: ok || false,
    });
  }
}
