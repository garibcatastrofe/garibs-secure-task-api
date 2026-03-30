import { ITaskUpdateInputDto } from '../../Domain/Interfaces/ITaskUpdateDto';

import { ITaskRepository } from '../../Domain/Interfaces/ITaskRepository';
import { ClsTaskPartialValidator } from '../Validators/ClsTaskPartialValidator';

import { ClsNotFoundException } from '@/src/Shared/Domain/Exceptions/ClsNotFound';
import { ClsTaskId } from '../../Domain/Entities/ValueObjects/ClsTaskId';

export class ClsUpdateTask {
  public constructor(private readonly taskRepository: ITaskRepository) {}

  public async updateTaskAsync({
    id,
    task,
  }: {
    id: number;
    task: Partial<ITaskUpdateInputDto>;
  }): Promise<void> {
    const idVerified = new ClsTaskId(id);

    // Buscar la tarea
    const taskFound = await this.taskRepository.selectTaskByIdAsync(idVerified.value);

    // Si la tarea no existe lanzar error
    if (!taskFound) {
      throw new ClsNotFoundException({
        message: `La tarea con el id ${idVerified.value} no fue encontrada`,
        ok: false,
      });
    }

    if (task !== undefined) {
      const taskBeforeValidation = {
        title: task.title,
        description: task.description,
        expiration_date: task.expiration_date,
        state: task.state,
      };

      // Validar los datos de la tarea que vengan
      const taskValidated = ClsTaskPartialValidator.validateData(taskBeforeValidation);

      // Realizar actualización de datos de la tarea
      if (Object.keys(taskValidated).length > 0) {
        await this.taskRepository.updateTaskAsync(taskFound.id ?? 0, taskValidated);
      }
    }
  }
}
