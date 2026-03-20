import { IUsuarioRepository } from '../../Domain/Interfaces/IUsuarioRepository';
import { IUsuarioQuery } from '../../Domain/Interfaces/IUsuarioQuery';
import { IUsuarioPrimitive } from '../../Domain/Interfaces/IUsuarioPrimitive';
import { IUsuarioWithRelations } from '../../Domain/Interfaces/IUsuarioWithRelations';
import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/Querys/IPaginatedResponse';

export class clsSelectUsuarios {
  public constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  public async SelectUsuariosAsync(
    query: IUsuarioQuery<IUsuarioPrimitive>,
  ): Promise<IPaginatedResponse<IUsuarioWithRelations>> {
    const usuarios = await this.usuarioRepository.SelectUsuariosAsync(query);
    return usuarios;
  }
}
