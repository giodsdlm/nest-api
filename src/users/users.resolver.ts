import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './modules/user';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Resolver(() => User) //user is the type returned by this Resolver
export class UsersResolver {
  constructor(private readonly userService: UsersService) {
    //^ injecting the userservice through dependency injection of nestjs. this way the service methods can be used here
  }

  //encapsulate this in a promise when using a real DB
  @Query(() => User, { name: 'user', nullable: true }) // means that the query will return a instance of the type User and we're renaming the query to be just 'user'. Also, can return a null value in case of not found
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.userService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.userService.getUsers(getUsersArgs);
  }

  @Query(() => [User], { name: 'allUsers', nullable: 'items' })
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.userService.createUser(createUserData);
  }
  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.userService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.userService.deleteUser(deleteUserData);
  }
}
