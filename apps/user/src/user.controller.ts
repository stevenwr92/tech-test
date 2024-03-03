import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto } from '@app/common';
import { GrpcMethod, Payload, RpcException } from '@nestjs/microservices';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'createUser')
  createUser(@Payload() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @GrpcMethod('UserService', 'getUser')
  async getUser(@Payload() dto: GetUserDto) {
    try {
      return this.userService.getUser(dto);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
