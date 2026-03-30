import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsTaskExpirationDate {
  public value: Date | null;

  public constructor(value?: string | null) {
    this.value = this.ensureIsValid(value);
  }

  private ensureIsValid(value?: string | null): Date | null {
    // Permitir null (porque en BD es nullable)
    if (!value) return null;

    const parsedDate = new Date(value);

    // Validar que sea una fecha válida
    if (isNaN(parsedDate.getTime())) {
      throw new ClsBadRequest({
        message: 'La fecha de expiración no es válida',
        ok: false,
      });
    }

    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    if (!isoRegex.test(value)) {
      throw new ClsBadRequest({ message: 'Formato de fecha de expiración inválido', ok: false });
    }

    return parsedDate;
  }
}
