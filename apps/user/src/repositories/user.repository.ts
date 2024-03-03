import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, GetUserDto } from '@app/common';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError && // Check if the error is a known request error
        error.code === 'P2002'
      ) {
        throw new ConflictException('User Sudah Terdaftar');
      }
      console.log(error);
    }
  }

  async getUser(dto: GetUserDto) {
    try {
      console.log('testing', dto);
      // const user = await this.prisma.user.findFirst({
      //   where: { name: dto.name },
      // });

      throw new RpcException('testing');
      // return user;
    } catch (error) {
      console.log(error);
    }
  }
}
