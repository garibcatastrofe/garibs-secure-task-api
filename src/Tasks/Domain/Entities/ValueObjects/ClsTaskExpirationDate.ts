import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsTaskExpirationDate {
  public value: string | null;

  public constructor(value?: string | null) {
    this.value = this.ensureIsValid(value);
  }

  private ensureIsValid(value?: string | null): string | null {
    // Permitir null (porque en BD es nullable)
    if (!value) return null;

    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (!regex.test(value)) {
      throw new ClsBadRequest({
        message: 'Formato inválido',
        ok: false,
      });
    }

    return value;
  }
}
