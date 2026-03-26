import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { IUserPrimitive } from '../Domain/Interfaces/IUserPrimitive';
import { ObjectUserFilterType } from '../Domain/Interfaces/ObjectUserFilterType';

const { Users } = ServiceContainer;

export class ClsUserController {
  public async insertUserAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;

      const userId = await Users.insert.insertUserAsync(body);

      res.status(201).json({ message: 'Usuario creado exitosamente', id: userId, ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async selectUsersAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        page = 0,
        perPage = 10,
        order = 'asc',
        orderBy = 'id' as keyof Omit<IUserPrimitive, 'password'>,
        filtersObject = {},
      } = req.body;

      const query: IQueryGeneral<Omit<IUserPrimitive, 'password'>, ObjectUserFilterType> = {
        page,
        perPage,
        order,
        orderBy,
        filtersObject,
      };

      const users = await Users.select.selectUsersAsync(query);

      res.status(201).json({ message: 'Usuarios encontrados correctamente', users, ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async selectUserByIdAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await Users.selectById.selectUserByIdAsync(Number(id));

      res.status(201).json({ message: 'Usuario encontrado correctamente', user, ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async updateUserAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = req.body;

      await Users.update.updateUserAsync({ id: Number(id), user });

      res
        .status(200)
        .json({ message: 'Los datos del usuario fueron actualizados exitosamente', ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUserAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await Users.delete.deleteUserAsync(Number(id));

      res.status(200).json({ message: 'El usuario fue eliminado exitosamente', ok: true });
    } catch (error) {
      next(error);
    }
  }
}
