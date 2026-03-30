import { ITaskRepository } from '../../Domain/Interfaces/ITaskRepository';
import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';
import { ITaskPrimitive } from '../../Domain/Interfaces/ITaskPrimitive';
import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/IPaginatedResponse';
import { ObjectTaskFilterType } from '../../Domain/Interfaces/ObjectTaskFilterType';

export class ClsSelectTasks {
  public constructor(private readonly taskRepository: ITaskRepository) {}

  public async selectTasksAsync(
    query: IQueryGeneral<ITaskPrimitive, ObjectTaskFilterType>,
  ): Promise<IPaginatedResponse<ITaskPrimitive>> {
    const tasks = await this.taskRepository.selectTasksAsync(query);

    return tasks;
  }
}
