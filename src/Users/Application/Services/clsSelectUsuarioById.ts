import { NotFoundException } from '@/src/Shared/Domain/Exceptions/NotFound';
import { IUsuarioRepository } from '../../Domain/Interfaces/IUsuarioRepository';
import { IUsuarioWithRelations } from '../../Domain/Interfaces/IUsuarioWithRelations';

export class clsSelectUsuarioById {
  public constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  public async SelectUsuarioByIdAsync(id: number): Promise<IUsuarioWithRelations | null> {
    const usuarioEncontrado = await this.usuarioRepository.SelectUsuarioByIdAsync(id);

    if (!usuarioEncontrado) {
      throw new NotFoundException({
        message: `El usuario con el id ${id} no fue encontrado`,
        campo: '/:id',
        data: id,
      });
    }

    return usuarioEncontrado ?? null;
  }
}
