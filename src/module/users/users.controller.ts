import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { CreateUserDto } from '../../dto/createUser.dto';
import { LoginUserDto } from '../../dto/loginUser.dto';
import { UpdateUserDto } from '../../dto/updateUser.dto';
import { UserDto } from '../../dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserDto],
  })
  // @UseInterceptors(ClassSerializerInterceptor)
  async getAll() {
    return await this.usersService.getAll();
  }

  @Post('find')
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async find(@Body() userDto: UserDto) {
    return await this.usersService.find(userDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserDto],
  })
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.register(userDto);
    if (!!user) return true;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unathorized',
  })
  async login(@Body() userDto: LoginUserDto): Promise<UserDto> {
    return await this.usersService.login(userDto.email, userDto.password);
  }

  @Put('update')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async updateUser(@Body() userDto: UpdateUserDto) {
    return this.usersService.update(userDto);
  }

  @Delete('delete')
  @ApiQuery({ name: 'email' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async deleteAuthor(@Query('email') email: string) {
    return this.usersService.delete(email);
  }
}
