import 'reflect-metadata';
import sequelize from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column({ type: sequelize.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: sequelize.STRING, unique: true })
  email: string;

  @Column({ type: sequelize.STRING, unique: true })
  password: string;

  @Column({ type: sequelize.STRING, unique: true })
  phone: string;

  @Column({ type: sequelize.STRING, unique: true })
  name: string;

  @Column({ type: sequelize.STRING, unique: true })
  username: string;
}
