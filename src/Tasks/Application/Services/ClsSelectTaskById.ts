import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';
import { ITaskRepository } from '../../Domain/Interfaces/ITaskRepository';
import { ITaskPrimitive } from '../../Domain/Interfaces/ITaskPrimitive';
import { ClsTaskId } from '../../Domain/Entities/ValueObjects/ClsTaskId';

export class ClsSelectTaskById {
  public constructor(private readonly taskRepository: ITaskRepository) {}

  public async selectTaskByIdAsync(id: number): Promise<ITaskPrimitive | null> {
    const taskIdVerified = new ClsTaskId(id);
    const taskFound = await this.taskRepository.selectTaskByIdAsync(taskIdVerified.value);

    if (!taskFound) {
      throw new ClsNotFoundException({
        message: `La tarea con el id ${id} no fue encontrada`,
        ok: false,
      });
    }

    return taskFound ?? null;
  }
}
