import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsTaskId {
  public value: number;

  public constructor(value: number) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: number): void {
    if (!value)
      throw new ClsBadRequest({
        message: 'El ID de la tarea es necesario',
        ok: false,
      });

    if (isNaN(value)) {
      throw new ClsBadRequest({
        message: 'El ID de la tarea debe de ser un número',
        ok: false,
      });
    }
  }

  public static empty(): ClsTaskId {
    return new ClsTaskId(1);
  }
}
