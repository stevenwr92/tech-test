import {
  CreateUserDto,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto).pipe(
      map((res) => {
        console.log(res);
        return res;
      }),
    );
  }

  async getUser(name: string) {
    return this.userService.getUser({ name }).pipe(
      map((res) => {
        console.log(res);
        return res;
      }),
    );
  }
}
