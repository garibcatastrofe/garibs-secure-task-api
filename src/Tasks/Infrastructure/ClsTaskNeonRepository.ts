import { db } from '@/src/Database/Infrastructure/Neon/drizzleNeonService';
import { eq, asc, desc, count, SQL, and, lt, gt, lte, gte, ne, like } from 'drizzle-orm';

import { tasks } from '@/src/Database/Infrastructure/Neon/Schemas/TaskSchema';

import { ITaskPrimitive } from '../Domain/Interfaces/ITaskPrimitive';

import { ITaskRepository } from '../Domain/Interfaces/ITaskRepository';
import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/IPaginatedResponse';
import { ObjectTaskFilterType } from '../Domain/Interfaces/ObjectTaskFilterType';
import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';

export class ClsTaskNeonRepository implements ITaskRepository {
  public async insertTaskAsync(task: Omit<ITaskPrimitive, 'id'>): Promise<number> {
    const [createdTask] = await db
      .insert(tasks)
      .values({
        title: task.title,
        description: task.description,
        creation_date: task.creation_date,
        expiration_date: task.expiration_date,
        state: task.state,
        user_id: task.user_id,
      })
      .returning({ id: tasks.id });

    return createdTask.id;
  }

  public async selectTasksAsync({
    page,
    perPage,
    order,
    orderBy,
    filtersObject,
  }: IQueryGeneral<ITaskPrimitive, ObjectTaskFilterType>): Promise<
    IPaginatedResponse<ITaskPrimitive>
  > {
    const conditions: (SQL<unknown> | undefined)[] = [];

    if (filtersObject) {
      if (
        filtersObject.filterById &&
        filtersObject.filterById.operator &&
        filtersObject.filterById.value
      ) {
        switch (filtersObject.filterById.operator) {
          case '=':
            conditions.push(eq(tasks.id, filtersObject.filterById.value));
            break;

          case '<':
            conditions.push(lt(tasks.id, filtersObject.filterById.value));
            break;

          case '>':
            conditions.push(gt(tasks.id, filtersObject.filterById.value));
            break;

          case '<=':
            conditions.push(lte(tasks.id, filtersObject.filterById.value));
            break;

          case '>=':
            conditions.push(gte(tasks.id, filtersObject.filterById.value));
            break;

          case '!=':
            conditions.push(ne(tasks.id, filtersObject.filterById.value));
            break;
        }
      }

      if (
        filtersObject.filterByTitle &&
        filtersObject.filterByTitle.operator &&
        filtersObject.filterByTitle.value
      ) {
        switch (filtersObject.filterByTitle.operator) {
          case '=':
            conditions.push(eq(tasks.title, filtersObject.filterByTitle.value));
            break;

          case 'LIKE':
            conditions.push(like(tasks.title, `%${filtersObject.filterByTitle.value}%`));
        }
      }

      if (
        filtersObject.filterByDescription &&
        filtersObject.filterByDescription.operator &&
        filtersObject.filterByDescription.value
      ) {
        switch (filtersObject.filterByDescription.operator) {
          case '=':
            conditions.push(eq(tasks.description, filtersObject.filterByDescription.value));
            break;

          case 'LIKE':
            conditions.push(
              like(tasks.description, `%${filtersObject.filterByDescription.value}%`),
            );
            break;
        }
      }

      if (
        filtersObject.filterByCreationDate &&
        filtersObject.filterByCreationDate.operator &&
        filtersObject.filterByCreationDate.value
      ) {
        switch (filtersObject.filterByCreationDate.operator) {
          case '=':
            conditions.push(eq(tasks.creation_date, filtersObject.filterByCreationDate.value));
            break;

          case '<':
            conditions.push(lt(tasks.creation_date, filtersObject.filterByCreationDate.value));
            break;

          case '>':
            conditions.push(gt(tasks.creation_date, filtersObject.filterByCreationDate.value));
            break;

          case '<=':
            conditions.push(lte(tasks.creation_date, filtersObject.filterByCreationDate.value));
            break;

          case '>=':
            conditions.push(gte(tasks.creation_date, filtersObject.filterByCreationDate.value));
            break;

          case '!=':
            conditions.push(ne(tasks.creation_date, filtersObject.filterByCreationDate.value));
            break;
        }
      } else if (
        filtersObject.filterByCreationDateInterval &&
        filtersObject.filterByCreationDateInterval.date_end &&
        filtersObject.filterByCreationDateInterval.date_start
      ) {
        conditions.push(
          gte(tasks.creation_date, filtersObject.filterByCreationDateInterval.date_start),
        );
        conditions.push(
          lte(tasks.creation_date, filtersObject.filterByCreationDateInterval.date_end),
        );
      }

      if (
        filtersObject.filterByExpirationDate &&
        filtersObject.filterByExpirationDate.operator &&
        filtersObject.filterByExpirationDate.value
      ) {
        switch (filtersObject.filterByExpirationDate.operator) {
          case '=':
            conditions.push(eq(tasks.expiration_date, filtersObject.filterByExpirationDate.value));
            break;

          case '<':
            conditions.push(lt(tasks.expiration_date, filtersObject.filterByExpirationDate.value));
            break;

          case '>':
            conditions.push(gt(tasks.expiration_date, filtersObject.filterByExpirationDate.value));
            break;

          case '<=':
            conditions.push(lte(tasks.expiration_date, filtersObject.filterByExpirationDate.value));
            break;

          case '>=':
            conditions.push(gte(tasks.expiration_date, filtersObject.filterByExpirationDate.value));
            break;

          case '!=':
            conditions.push(ne(tasks.expiration_date, filtersObject.filterByExpirationDate.value));
            break;
        }
      } else if (
        filtersObject.filterByExpirationDateInterval &&
        filtersObject.filterByExpirationDateInterval.date_start &&
        filtersObject.filterByExpirationDateInterval.date_end
      ) {
        conditions.push(
          gte(tasks.expiration_date, filtersObject.filterByExpirationDateInterval.date_start),
        );
        conditions.push(
          lte(tasks.expiration_date, filtersObject.filterByExpirationDateInterval.date_end),
        );
      }

      if (
        filtersObject.filterByState &&
        filtersObject.filterByState.operator &&
        filtersObject.filterByState.value
      ) {
        switch (filtersObject.filterByState.operator) {
          case '=':
            conditions.push(eq(tasks.state, filtersObject.filterByState.value));
            break;
        }
      }

      if (
        filtersObject.filterByUserId &&
        filtersObject.filterByUserId.operator &&
        filtersObject.filterByUserId.value
      ) {
        switch (filtersObject.filterByUserId.operator) {
          case '=':
            conditions.push(eq(tasks.user_id, filtersObject.filterByUserId.value));
            break;

          case '<':
            conditions.push(lt(tasks.user_id, filtersObject.filterByUserId.value));
            break;

          case '>':
            conditions.push(gt(tasks.user_id, filtersObject.filterByUserId.value));
            break;

          case '<=':
            conditions.push(lte(tasks.user_id, filtersObject.filterByUserId.value));
            break;

          case '>=':
            conditions.push(gte(tasks.user_id, filtersObject.filterByUserId.value));
            break;

          case '!=':
            conditions.push(ne(tasks.user_id, filtersObject.filterByUserId.value));
            break;
        }
      }
    }

    const whereStatement = and(...conditions);

    const rows = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        creation_date: tasks.creation_date,
        expiration_date: tasks.expiration_date,
        state: tasks.state,
        user_id: tasks.user_id,
      })
      .from(tasks)
      .where(whereStatement)
      .orderBy(order === 'asc' ? asc(tasks[orderBy]) : desc(tasks[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const tasksCount = await db.select({ count: count() }).from(tasks).where(whereStatement);

    return {
      data: rows,
      count: tasksCount[0].count,
    };
  }

  public async selectTaskByIdAsync(id: number): Promise<ITaskPrimitive | null> {
    const taskFound = await db
      .select({
        task: {
          id: tasks.id,
          title: tasks.title,
          description: tasks.description,
          creation_date: tasks.creation_date,
          expiration_date: tasks.expiration_date,
          state: tasks.state,
          user_id: tasks.user_id,
        },
      })
      .from(tasks)
      .where(eq(tasks.id, id));

    if (taskFound.length === 0) return null;

    return taskFound[0].task;
  }

  public async updateTaskAsync(id: number, task: Partial<ITaskPrimitive>): Promise<void> {
    const updateData: Partial<typeof tasks.$inferInsert> = {};

    if (task.title !== undefined) {
      updateData.title = task.title;
    }

    if (task.description !== undefined) {
      updateData.description = task.description;
    }

    if (task.expiration_date !== undefined) {
      updateData.expiration_date = task.expiration_date;
    }

    if (task.state !== undefined) {
      updateData.state = task.state;
    }

    if (Object.keys(updateData).length === 0) {
      return;
    }

    await db.update(tasks).set(updateData).where(eq(tasks.id, id));
  }

  public async deleteTaskAsync(id: number): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }
}
