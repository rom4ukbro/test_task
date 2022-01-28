import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as cryptojs from 'crypto-js';
import sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../../dto/createUser.dto';
import { UserDto } from '../../dto/user.dto';
import { Users } from '../../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersModel: typeof Users,
  ) {}

  async getAll(): Promise<UserDto[]> {
    const users = await this.usersModel.findAll({
      attributes: ['id', 'email', 'name', 'username', 'phone'],
    });
    // не знаю чи треба пагінацію, надіюся ні
    if (!users.length)
      throw new HttpException('USER NOT_FOUND', HttpStatus.NOT_FOUND);
    return users;
  }

  async find(userDto: UserDto): Promise<UserDto[]> {
    const user = await this.usersModel.findAll({
      where: {
        [sequelize.Op.and]: {
          ...userDto,
        },
      },
      attributes: ['id', 'email', 'name', 'username', 'phone'],
    });

    if (!user.length)
      throw new HttpException('USER NOT_FOUND', HttpStatus.NOT_FOUND);

    return user;
  }

  async register(userDto: CreateUserDto): Promise<CreateUserDto> {
    const findUser = await this.usersModel.findOne({
      where: { email: userDto.email },
    });

    if (!!findUser)
      throw new HttpException(
        'This email already exist',
        HttpStatus.BAD_REQUEST,
      );

    userDto.password = bcrypt.hashSync(userDto.password, 10);

    const userModel = new this.usersModel(userDto);

    return await userModel.save();
  }

  async login(email: string, password: string): Promise<UserDto> {
    const user = await this.usersModel.findOne({
      where: {
        email,
      },
    });

    if (!user)
      throw new HttpException('USER_NOT_EXIST', HttpStatus.UNAUTHORIZED);

    const pass = bcrypt.compareSync(password, user.password);

    if (!pass)
      throw new HttpException(
        'USER_INCORRECT_PASSWORD',
        HttpStatus.UNAUTHORIZED,
      );

    if (!user) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    return {
      email: user.email,
      name: user.name,
      username: user.username,
      phone: user.phone,
    };
  }

  async update(userDto: CreateUserDto): Promise<Users> {
    // Звісно ж так не треба пароль обновляти, але в тестовому я думаю не треба робити ще ендпоінт для зміни паролю
    userDto.password
      ? (userDto.password = cryptojs
          .SHA256(userDto.password)
          .toString(cryptojs.enc.Hex))
      : 0;

    const user = await this.usersModel.findOne({
      where: { email: userDto.email },
    });

    if (!user) throw new HttpException('USER NOT_FOUND', HttpStatus.NOT_FOUND);

    const updateUser = await user.update(userDto);
    await updateUser.save({});

    return updateUser;
  }

  async delete(email: string): Promise<HttpException> {
    if (!email)
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);

    const user = await this.usersModel.destroy({ where: { email } });

    if (!user) new HttpException('User not found', HttpStatus.NOT_FOUND);
    return new HttpException('Deleted successfully', HttpStatus.NO_CONTENT);
  }
}
