/**
 * Clase Custom Error params
 * @property {number} statusCode - Codigo de Estado HTTP
 * @property {string} message - Mensaje de Error
 * @property {unknown} details - Detalles adicionales sobre el error
 * @property {string} name - Nombre del Error
 * @property {boolean} ok - Indica si la peticion fue exitosa
 */
export class CustomError extends Error {
  public statusCode: number;
  public details?: ICustomErrorDetails;
  public ok = false;
  public constructor({
    statusCode,
    message,
    details,
    name,
  }: {
    statusCode: number;
    message: string;
    details?: ICustomErrorDetails;
    name: string;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = name;
  }
}

export interface ICustomErrorDetails {
  [key: string]: unknown;
}
