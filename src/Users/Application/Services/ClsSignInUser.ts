import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';
import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { IUserPrimitive } from '../../Domain/Interfaces/IUserPrimitive';
import bcrypt from 'bcryptjs';
import { ClsBadRequest } from '@/src/Shared/Domain/Exceptions/ClsBadRequest';

export class ClsSignInUser {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async signInUserAsync(
    email: string,
    password: string,
  ): Promise<Omit<IUserPrimitive, 'password'>> {
    if (!email || !password) {
      throw new ClsBadRequest({
        message: 'Por favor proporcione los datos para iniciar sesión',
        ok: false,
      });
    }

    const userFound = await this.userRepository.selectUserByEmailAsync(email);

    if (!userFound) {
      throw new ClsNotFoundException({
        message: `Datos incorrectos, intente nuevamente`,
        ok: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      throw new ClsNotFoundException({
        message: `Datos incorrectos, intente nuevamente`,
        ok: false,
      });
    }

    return userFound;
  }
}
