import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsUserPassword {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) throw new ClsBadRequest({ message: 'La contraseña es necesaria' });

    if (value.length < 8)
      throw new ClsBadRequest({ message: 'La contraseña debe ser mayor de 8 caracteres' });

    if (value.length > 50)
      throw new ClsBadRequest({ message: 'La contraseña debe ser menor a 50 caracteres' });

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(value)) {
      throw new ClsBadRequest({
        message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número',
      });
    }
  }
}
