import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async createUser(dto: CreateUserDto) {
    return this.userService.createUser(dto).pipe(
      map(() => {
        return this.userRepository.createUser(dto);
      }),
    );
  }
}
