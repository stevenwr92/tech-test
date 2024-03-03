import { Injectable } from '@nestjs/common';
import { CreateUserDto, GetUserDto } from '@app/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto) {
    return this.userRepository.createUser(dto);
  }

  async getUser(dto: GetUserDto) {
    return this.userRepository.getUser(dto);
  }
}
