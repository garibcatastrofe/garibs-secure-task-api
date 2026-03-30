import { ITaskPrimitive } from '../../Domain/Interfaces/ITaskPrimitive';
import { ClsTask } from '../../Domain/Entities/Main/ClsTask';

export class ClsTaskMapper {
  public static toPrimitive(task: ClsTask): ITaskPrimitive {
    return {
      id: task.taskId.value,
      title: task.taskTitle.value,
      description: task.taskDescription.value,
      creation_date: task.taskCreationDate.value,
      expiration_date: task.taskExpirationDate.value,
      state: task.taskState.value,
      user_id: task.taskUserId.value,
    };
  }
}
