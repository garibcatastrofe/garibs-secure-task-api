import { ClsTaskId } from '../ValueObjects/ClsTaskId';
import { ClsTaskTitle } from '../ValueObjects/ClsTaskTitle';
import { ClsTaskDescription } from '../ValueObjects/ClsTaskDescription';
import { ClsTaskCreationDate } from '../ValueObjects/ClsTaskCreationDate';
import { ClsTaskExpirationDate } from '../ValueObjects/ClsTaskExpirationDate';
import { ClsTaskState } from '../ValueObjects/ClsTaskState';
import { ClsUserId } from '@/src/Users/Domain/Entities/ValueObjects/ClsUserId';

export class ClsTask {
  public taskId: ClsTaskId;
  public taskTitle: ClsTaskTitle;
  public taskDescription: ClsTaskDescription;
  public taskCreationDate: ClsTaskCreationDate;
  public taskExpirationDate: ClsTaskExpirationDate;
  public taskState: ClsTaskState;
  public taskUserId: ClsUserId;

  public constructor(
    id: ClsTaskId,
    title: ClsTaskTitle,
    description: ClsTaskDescription,
    creation_date: ClsTaskCreationDate,
    expiration_date: ClsTaskExpirationDate,
    state: ClsTaskState,
    user_id: ClsUserId,
  ) {
    this.taskId = id;
    this.taskTitle = title;
    this.taskDescription = description;
    this.taskCreationDate = creation_date;
    this.taskExpirationDate = expiration_date;
    this.taskState = state;
    this.taskUserId = user_id;
  }
}
