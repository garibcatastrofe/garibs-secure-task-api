import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';
import { ServiceContainer } from '@/src/Shared/Infrastructure/ServiceContainer';
import { NextFunction, Request, Response } from 'express';
import { ITaskPrimitive } from '../Domain/Interfaces/ITaskPrimitive';
import { ObjectTaskFilterType } from '../Domain/Interfaces/ObjectTaskFilterType';

const { Tasks } = ServiceContainer;

export class ClsTaskController {
  public async insertTaskAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;

      const taskId = await Tasks.insert.insertTaskAsync(body);

      res.status(201).json({ message: 'Tarea creada exitosamente', id: taskId, ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async selectTasksAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        page = 0,
        perPage = 10,
        order = 'asc',
        orderBy = 'id' as keyof ITaskPrimitive,
        filtersObject = {},
      } = req.body;

      const query: IQueryGeneral<ITaskPrimitive, ObjectTaskFilterType> = {
        page,
        perPage,
        order,
        orderBy,
        filtersObject,
      };

      const tasks = await Tasks.select.selectTasksAsync(query);

      res.status(201).json({ message: 'Tareas encontradas correctamente', tasks, ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async selectTaskByIdAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await Tasks.selectById.selectTaskByIdAsync(Number(id));

      res.status(201).json({ message: 'Tarea encontrada correctamente', task, ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async updateTaskAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = req.body;

      await Tasks.update.updateTaskAsync({ id: Number(id), task });

      res
        .status(200)
        .json({ message: 'Los datos de la tarea fueron actualizados exitosamente', ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async deleteTaskAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await Tasks.delete.deleteTaskAsync(Number(id));

      res.status(200).json({ message: 'La tarea fue eliminada exitosamente', ok: true });
    } catch (error) {
      next(error);
    }
  }
}
