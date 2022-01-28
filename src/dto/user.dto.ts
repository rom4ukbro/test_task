import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Min } from 'class-validator';

export class UserDto {
  @ApiProperty({})
  email: string;

  @ApiProperty({})
  name: string;

  @ApiProperty({})
  username: string;

  @ApiProperty({})
  phone: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
