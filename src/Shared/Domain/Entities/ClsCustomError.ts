/**
 * Clase Custom Error params
 * @property {number} statusCode - Codigo de Estado HTTP
 * @property {string} message - Mensaje de Error
 * @property {unknown} details - Detalles adicionales sobre el error
 * @property {string} name - Nombre del Error
 * @property {boolean} ok - Indica si la peticion fue exitosa
 */
export class ClsCustomError extends Error {
  public statusCode: number;
  public details?: ICustomErrorDetails;
  public ok = false;
  public message: string;
  public constructor({
    statusCode,
    message,
    details,
    name,
    ok,
  }: {
    statusCode: number;
    message: string;
    details?: ICustomErrorDetails;
    name: string;
    ok: boolean;
  }) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
    this.name = name;
    this.ok = ok;
  }
}

export interface ICustomErrorDetails {
  [key: string]: unknown;
}
