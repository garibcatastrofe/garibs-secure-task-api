import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';
import { IS_ADMIN, IsAdminType } from '../../Interfaces/IsAdmin';

export class ClsUserIsAdmin {
  public value: string;

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!value) {
      throw new ClsBadRequest({
        message: 'Favor de Seleccionar un estatus',
      });
    }
    if (!IS_ADMIN.includes(value as IsAdminType)) {
      throw new ClsBadRequest({
        message: 'Favor de seleccionar un valor válido de estatus: ACTIVO o INACTIVO',
      });
    }
  }
}
