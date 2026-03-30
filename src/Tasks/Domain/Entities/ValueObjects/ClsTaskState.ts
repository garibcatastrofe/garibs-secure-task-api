import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';
import { STATE, StatusType } from '../../Interfaces/State';

export class ClsTaskState {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) {
      throw new ClsBadRequest({
        ok: true,
        message: 'Favor de seleccionar un estado',
      });
    }
    if (!STATE.includes(value as StatusType)) {
      throw new ClsBadRequest({
        message:
          'Favor de seleccionar un valor válido de estado: COMPLETADA, NO COMPLETADA, EN PROCESO o CANCELADA',
        ok: false,
      });
    }
  }
}
