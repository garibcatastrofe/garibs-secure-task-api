import { ClsCustomError } from '../Entities/ClsCustomError';

/**
 * Clase Not Found params
 * @property {string} message - Mensaje de Error
 * @property {unknown} details - Detalles adicionales sobre el error
 */
export class ClsNotFoundException extends ClsCustomError {
  public constructor(details?: Record<string, unknown>) {
    super({
      statusCode: 404,
      message: 'Resource not found',
      details: details,
      name: 'NotFoundException',
    });
  }
}
