import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsTaskCreationDate {
  public value: Date;

  public constructor(value?: string) {
    this.value = this.ensureIsValid(value);
  }

  private ensureIsValid(value?: string): Date {
    if (!value) {
      throw new ClsBadRequest({
        message: 'La fecha de creación es obligatoria',
        ok: false,
      });
    }

    const parsedDate = new Date(value);

    // Validar que sea una fecha válida
    if (isNaN(parsedDate.getTime())) {
      throw new ClsBadRequest({
        message: 'La fecha de creación no es válida',
        ok: false,
      });
    }

    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    if (!isoRegex.test(value)) {
      throw new ClsBadRequest({ message: 'Formato de fecha de creación inválido', ok: false });
    }

    return parsedDate;
  }
}
