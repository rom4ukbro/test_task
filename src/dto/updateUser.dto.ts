import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ minLength: 2 })
  @MinLength(2)
  name: string;

  @ApiProperty({ minLength: 5 })
  @MinLength(5)
  username: string;

  @ApiProperty({ maxLength: 9, minLength: 9 })
  @Length(9)
  @IsPhoneNumber('UA')
  phone: string;
}
