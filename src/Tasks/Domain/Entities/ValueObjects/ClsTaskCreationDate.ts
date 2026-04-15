import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsTaskCreationDate {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) {
      throw new ClsBadRequest({
        message: 'La fecha es requerida',
        ok: false,
      });
    }

    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (!regex.test(value)) {
      throw new ClsBadRequest({
        message: 'Formato inválido',
        ok: false,
      });
    }
  }
}
