import { type Repository } from '#libs/types/types.js';
import { UserEntity } from '#packages/users/user.entity.js';
import { type UserModel } from '#packages/users/users.js';

import { UsersRelation } from './libs/enums/enums.js';
import {
  type UserCommonQueryResponse,
  type UserCreateQueryPayload,
} from './libs/types/types.js';
import { UserWithPasswordEntity } from './user-with-password.entity.js';

class UserRepository implements Repository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findById(id: number): Promise<UserWithPasswordEntity | null> {
    const user = await this.userModel
      .query()
      .withGraphJoined(UsersRelation.DETAILS)
      .findById(id)
      .castTo<UserCommonQueryResponse | undefined>()
      .execute();

    if (!user) {
      return null;
    }

    return UserWithPasswordEntity.initializeWithPassword({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
    });
  }

  public async findAll(): Promise<UserWithPasswordEntity[]> {
    const users = await this.userModel
      .query()
      .select()
      .withGraphJoined(UsersRelation.DETAILS)
      .castTo<UserCommonQueryResponse[]>()
      .execute();

    return users.map((user) => {
      return UserWithPasswordEntity.initializeWithPassword({
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        fullName: user.details?.fullName ?? '',
      });
    });
  }

  public async create(
    entity: UserWithPasswordEntity,
  ): Promise<UserWithPasswordEntity> {
    const { email, passwordSalt, passwordHash, fullName } =
      entity.toNewObjectWithPassword();
    const user = await this.userModel
      .query()
      .insertGraph({
        email,
        passwordSalt,
        passwordHash,
        [UsersRelation.DETAILS]: {
          fullName,
        },
      } as UserCreateQueryPayload)
      .withGraphJoined(UsersRelation.DETAILS)
      .castTo<UserCommonQueryResponse>()
      .execute();

    return UserWithPasswordEntity.initializeWithPassword({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
    });
  }

  public async getUserInfoWithPassword(
    email: string,
  ): Promise<UserWithPasswordEntity | null> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      return null;
    }

    return UserWithPasswordEntity.initializeWithPassword({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      fullName: user.details?.fullName ?? '',
    });
  }

  private async findUserByEmail(
    email: string,
  ): Promise<UserCommonQueryResponse | undefined> {
    return await this.userModel
      .query()
      .withGraphJoined(UsersRelation.DETAILS)
      .findOne({ email })
      .castTo<UserCommonQueryResponse | undefined>();
  }
}

export { UserRepository };
