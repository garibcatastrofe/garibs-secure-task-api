import { CustomError } from '../Entities/CustomError';

/**
 * Clase Bad Request params
 * @property {string} message - Mensaje de Error
 * @property {unknown} details - Detalles adicionales sobre el error
 */
export class BadRequest extends CustomError {
  public constructor(details?: Record<string, unknown>, message?: string) {
    super({
      statusCode: 400,
      message: message || 'Bad Request',
      details: details,
      name: 'BadRequest',
    });
  }
}
