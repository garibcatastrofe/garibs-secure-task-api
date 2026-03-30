import { ClsTaskTitle } from '../../Domain/Entities/ValueObjects/ClsTaskTitle';
import { ClsTaskDescription } from '../../Domain/Entities/ValueObjects/ClsTaskDescription';
import { ClsTaskExpirationDate } from '../../Domain/Entities/ValueObjects/ClsTaskExpirationDate';
import { ClsTaskState } from '../../Domain/Entities/ValueObjects/ClsTaskState';

import { ITaskUpdateDto, ITaskUpdateInputDto } from '../../Domain/Interfaces/ITaskUpdateDto';

export class ClsTaskPartialValidator {
  public static validateData(task: ITaskUpdateInputDto | undefined): ITaskUpdateDto {
    const validatedTask: ITaskUpdateDto = {};

    if (task?.title !== undefined) {
      validatedTask.title = new ClsTaskTitle(task.title).value;
    }

    if (task?.description !== undefined) {
      validatedTask.description = new ClsTaskDescription(task.description).value;
    }

    if (task?.expiration_date !== undefined) {
      validatedTask.expiration_date = new ClsTaskExpirationDate(task.expiration_date).value;
    }

    if (task?.state !== undefined) {
      validatedTask.state = new ClsTaskState(task.state).value;
    }

    return validatedTask;
  }
}
