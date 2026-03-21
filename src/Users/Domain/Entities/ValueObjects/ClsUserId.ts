import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsUserId {
  public value: number;

  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: number): void {
    if (!value)
      throw new ClsBadRequest({
        message: 'El ID del usuario es necesario',
        ok: false,
      });

    if (isNaN(value)) {
      throw new ClsBadRequest({
        message: 'El ID del usuario debe de ser un número',
        ok: false,
      });
    }
  }

  public static empty(): ClsUserId {
    return new ClsUserId(1);
  }
}
