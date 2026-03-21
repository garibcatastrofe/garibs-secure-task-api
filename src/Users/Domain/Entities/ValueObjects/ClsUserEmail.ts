import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsUserEmail {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) throw new ClsBadRequest({ message: 'El correo es necesario', ok: false });

    if (value.length < 5)
      throw new ClsBadRequest({ message: 'El correo debe ser mayor de 5 caracteres', ok: false });

    if (value.length > 50)
      throw new ClsBadRequest({ message: 'El correo debe ser menor a 50 caracteres', ok: false });
  }
}
