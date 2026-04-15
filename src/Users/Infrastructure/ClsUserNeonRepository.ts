import { db } from '@/src/Database/Infrastructure/Neon/drizzleNeonService';
import { eq, asc, desc, count, SQL, and, lt, gt, lte, gte, ne, like } from 'drizzle-orm';

import { users } from '@/src/Database/Infrastructure/Neon/Schemas/UserSchema';

import { IUserPrimitive } from '../Domain/Interfaces/IUserPrimitive';

import { IUserRepository } from '../Domain/Interfaces/IUserRepository';
import { IPaginatedResponse } from '@/src/Shared/Domain/Interfaces/IPaginatedResponse';
import { ObjectUserFilterType } from '../Domain/Interfaces/ObjectUserFilterType';
import { IQueryGeneral } from '@/src/Shared/Domain/Interfaces/IQueryGeneral';

export class ClsUserNeonRepository implements IUserRepository {
  public async insertUserAsync(user: Omit<IUserPrimitive, 'id'>): Promise<number> {
    const [createdUser] = await db
      .insert(users)
      .values({
        user_name: user.user_name,
        email: user.email,
        password: user.password,
        is_admin: user.is_admin,
      })
      .returning({ id: users.id });

    return createdUser.id;
  }

  public async selectUsersAsync({
    page,
    perPage,
    order,
    orderBy,
    filtersObject,
  }: IQueryGeneral<Omit<IUserPrimitive, 'password'>, ObjectUserFilterType>): Promise<
    IPaginatedResponse<Omit<IUserPrimitive, 'password'>>
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
            conditions.push(eq(users.id, filtersObject.filterById.value));
            break;

          case '<':
            conditions.push(lt(users.id, filtersObject.filterById.value));
            break;

          case '>':
            conditions.push(gt(users.id, filtersObject.filterById.value));
            break;

          case '<=':
            conditions.push(lte(users.id, filtersObject.filterById.value));
            break;

          case '>=':
            conditions.push(gte(users.id, filtersObject.filterById.value));
            break;

          case '!=':
            conditions.push(ne(users.id, filtersObject.filterById.value));
        }
      }

      if (
        filtersObject.filterByUserName &&
        filtersObject.filterByUserName.operator &&
        filtersObject.filterByUserName.value
      ) {
        switch (filtersObject.filterByUserName.operator) {
          case '=':
            conditions.push(eq(users.user_name, filtersObject.filterByUserName.value));
            break;

          case 'LIKE':
            conditions.push(like(users.user_name, `%${filtersObject.filterByUserName.value}%`));
        }
      }

      if (
        filtersObject.filterByEmail &&
        filtersObject.filterByEmail.operator &&
        filtersObject.filterByEmail.value
      ) {
        switch (filtersObject.filterByEmail.operator) {
          case '=':
            conditions.push(eq(users.email, filtersObject.filterByEmail.value));
            break;

          case 'LIKE':
            conditions.push(like(users.email, `%${filtersObject.filterByEmail.value}%`));
            break;
        }
      }

      if (
        filtersObject.filterByIsAdmin &&
        filtersObject.filterByIsAdmin.operator &&
        filtersObject.filterByIsAdmin.value
      ) {
        switch (filtersObject.filterByIsAdmin.operator) {
          case '=':
            conditions.push(eq(users.is_admin, filtersObject.filterByIsAdmin.value));
            break;
        }
      }
    }

    const whereStatement = and(...conditions);

    const rows = await db
      .select({
        id: users.id,
        user_name: users.user_name,
        email: users.email,
        is_admin: users.is_admin,
      })
      .from(users)
      .where(whereStatement)
      .orderBy(order === 'asc' ? asc(users[orderBy]) : desc(users[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const usersCount = await db.select({ count: count() }).from(users).where(whereStatement);

    return {
      data: rows,
      count: usersCount[0].count,
    };
  }

  public async selectUserByIdAsync(id: number): Promise<Omit<IUserPrimitive, 'password'> | null> {
    const userFound = await db
      .select({
        usuario: {
          id: users.id,
          user_name: users.user_name,
          email: users.email,
          is_admin: users.is_admin,
        },
      })
      .from(users)
      .where(eq(users.id, id));

    if (userFound.length === 0) return null;

    return userFound[0].usuario;
  }

  public async updateUserAsync(id: number, user: Partial<IUserPrimitive>): Promise<void> {
    const updateData: Partial<typeof users.$inferInsert> = {};

    if (user.user_name !== undefined) {
      updateData.user_name = user.user_name;
    }

    if (user.email !== undefined) {
      updateData.email = user.email;
    }

    if (user.password !== undefined) {
      updateData.password = user.password;
    }

    if (Object.keys(updateData).length === 0) {
      return;
    }

    await db.update(users).set(updateData).where(eq(users.id, id));
  }

  public async deleteUserAsync(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  public async selectUserByEmailAsync(email: string): Promise<IUserPrimitive | null> {
    const usersFound = await db.select().from(users).where(eq(users.email, email));
    return usersFound[0] ?? null;
  }

  public async selectUserByUserNameAsync(username: string): Promise<IUserPrimitive | null> {
    const usersFound = await db.select().from(users).where(eq(users.user_name, username));
    return usersFound[0] ?? null;
  }
}
