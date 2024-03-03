import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from '@app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  createUser(@Body() dto: CreateUserDto) {
    return this.appService.createUser(dto);
  }

  @Get('user/:name')
  getUserByName(@Param('name') name: string) {
    return this.appService.getUser(name);
  }
}
