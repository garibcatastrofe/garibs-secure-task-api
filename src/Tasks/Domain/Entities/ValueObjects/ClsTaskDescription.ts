import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsTaskDescription {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) throw new ClsBadRequest({ message: 'La descripción es necesaria', ok: false });

    if (value.length < 5)
      throw new ClsBadRequest({
        message: 'La descripción debe ser mayor de 5 caracteres',
        ok: false,
      });

    if (value.length > 750)
      throw new ClsBadRequest({
        message: 'La descripción debe ser menor a 750 caracteres',
        ok: false,
      });
  }
}
