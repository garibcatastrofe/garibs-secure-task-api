import { ITaskRepository } from '../../Domain/Interfaces/ITaskRepository';
import { ClsTaskId } from '../../Domain/Entities/ValueObjects/ClsTaskId';
import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';

export class ClsDeleteTask {
  public constructor(private readonly taskRepository: ITaskRepository) {}

  public async deleteUserAsync(id: number): Promise<void> {
    const id_task = new ClsTaskId(id);

    // Buscar la tarea
    const taskFound = await this.taskRepository.selectTaskByIdAsync(id_task.value);

    // Si la tarea no existe lanzar error
    if (!taskFound) {
      throw new ClsNotFoundException({
        message: `La tarea con el id ${id_task.value} no fue encontrada`,
        ok: false,
      });
    }

    await this.taskRepository.deleteTaskAsync(id_task.value);
  }
}
