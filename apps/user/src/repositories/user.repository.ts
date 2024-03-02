import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '@app/common';
import { Prisma } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          profile_pic_url: dto.profilePicUrl,
        },
      });
      return user;
    } catch (error) {}
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    )
      throw new ConflictException('User Sudah Terdaftar');

    throw error;
  }
}
