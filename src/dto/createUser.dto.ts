import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: true, minLength: 2 })
  @MinLength(2)
  name: string;

  @ApiProperty({ required: true, minLength: 5 })
  @MinLength(5)
  username: string;

  @ApiProperty({ required: true, maxLength: 9, minLength: 9 })
  @Length(9)
  @IsPhoneNumber('UA')
  phone: string;
}
