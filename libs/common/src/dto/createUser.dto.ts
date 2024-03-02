import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserMessage } from '../types';

export class CreateUserDto implements CreateUserMessage {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  profilePicUrl: string;
}
