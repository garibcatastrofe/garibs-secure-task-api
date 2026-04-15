import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { IUserPrimitive } from '../Domain/Interfaces/IUserPrimitive';
import { ObjectUserFilterType } from '../Domain/Interfaces/ObjectUserFilterType';
import jwt from 'jsonwebtoken';
import { env } from '@/src/Shared/Infrastructure/ClsEnvironmentContainer';

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

  public async signUpUserAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;

      const userId = await Users.signUp.signUpUserAsync(body);
      const accessToken = jwt.sign({ id: userId }, env.AUTH_KEY, { expiresIn: '7d' });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en ms
      });

      res.status(200).json({
        message: 'Su usuario fue creado y la sesión fue iniciada correctamente',
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  }

  public async signInAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const userFound = await Users.signIn.signInUserAsync(email, password);
      const accessToken = jwt.sign({ id: userFound.id }, env.AUTH_KEY, { expiresIn: '7d' });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en ms
      });

      console.warn("Pasó el SignIn")

      res.status(200).json({ message: 'La sesión fue iniciada correctamente', ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async verifyAsync(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies.accessToken;

      console.warn("Entró al verify")

      if (!token) {
        res.status(401).json({ message: 'No tiene sesión iniciada, acceso denegado', ok: false });
        return;
      }

      const decoded = jwt.verify(token, env.AUTH_KEY);

      res.status(200).json({
        message: 'La sesión fue verificada correctamente',
        ok: true,
        token: decoded,
      });
    } catch {
      res
        .status(403)
        .json({ message: 'El token de sesión es inválido, acceso denegado', ok: false });
    }
  }

  public async signOutAsync(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      res.status(200).json({ message: 'La sesión fue cerrada correctamente', ok: true });
    } catch {
      res.status(403).json({ message: 'La sesión no fue cerrada correctamente', ok: false });
    }
  }
}
