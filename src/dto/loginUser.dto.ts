import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
