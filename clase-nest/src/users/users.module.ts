import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {MongooseModule}from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from './schemas/user.schema';
import { USERS_REPOSITORY } from './usersRepository';
import { MongoUsersRepository } from './mongo-users';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, {
    provide: USERS_REPOSITORY,
    useClass:MongoUsersRepository
  }]
})
export class UsersModule {}
