import { CustomError } from '../Entities/CustomError';

/**
 * Clase Not Found params
 * @property {string} message - Mensaje de Error
 * @property {unknown} details - Detalles adicionales sobre el error
 */
export class NotFoundException extends CustomError {
  public constructor(details?: Record<string, unknown>) {
    super({
      statusCode: 404,
      message: 'Resource not found',
      details: details,
      name: 'NotFoundException',
    });
  }
}
