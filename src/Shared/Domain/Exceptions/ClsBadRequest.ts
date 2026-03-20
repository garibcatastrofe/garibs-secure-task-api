import { ClsCustomError } from '../Entities/ClsCustomError';

/**
 * Clase Bad Request params
 * @property {string} message - Mensaje de Error
 * @property {unknown} details - Detalles adicionales sobre el error
 */
export class ClsBadRequest extends ClsCustomError {
  public constructor(details?: Record<string, unknown>, message?: string) {
    super({
      statusCode: 400,
      message: message || 'Bad Request',
      details: details,
      name: 'BadRequest',
    });
  }
}
