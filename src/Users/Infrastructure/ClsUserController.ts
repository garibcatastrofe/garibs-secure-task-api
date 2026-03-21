import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';

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
      const body = req.body;

      const users = await Users.select.selectUsersAsync(body);

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
      const user = req.body.user;

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
