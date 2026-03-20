import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsUserUserName {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) throw new ClsBadRequest({ message: 'El nombre de usuario es necesario' });

    if (value.length < 5)
      throw new ClsBadRequest({ message: 'El nombre de usuario debe ser mayor de 5 caracteres' });

    if (value.length > 50)
      throw new ClsBadRequest({ message: 'El nombre de usuario debe ser menor a 50 caracteres' });
  }
}
