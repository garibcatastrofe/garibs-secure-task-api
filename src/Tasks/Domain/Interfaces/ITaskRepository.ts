import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/IPaginatedResponse';
import { ITaskPrimitive } from './ITaskPrimitive';
import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';
import { ObjectTaskFilterType } from './ObjectTaskFilterType';

export interface ITaskRepository {
  insertTaskAsync(task: ITaskPrimitive): Promise<number>;
  selectTasksAsync(
    query: IQueryGeneral<ITaskPrimitive, ObjectTaskFilterType>,
  ): Promise<IPaginatedResponse<ITaskPrimitive>>;
  selectTaskByIdAsync(id: number): Promise<ITaskPrimitive | null>;
  updateTaskAsync(id: number, user: Partial<ITaskPrimitive>): Promise<void>;
  deleteTaskAsync(id: number): Promise<void>;
}
