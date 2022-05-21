import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryData } from 'src/class/QueryData';
import { ILike, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .select(['user.userId', 'user.username', 'user.phone', 'user.nickname'])
        .where({ status: true })
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async insertUser(user: User): Promise<User[] | string> {
    try {
      const username = user.username;
      const userList = await this.userRepository
        .createQueryBuilder()
        .select()
        .where({ username })
        .getMany();
      if (!userList.length) {
        await this.userRepository
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(user)
          .execute();
      } else {
        const usernames = userList.map((user) => user.username).join('，');
        return `${usernames}已存在！`;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchUsers(query: QueryData): Promise<User[]> {
    const queryStr = `%${query.data.split('').join('%')}%`;
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.userId',
          'user.username',
          'user.password',
          'user.phone',
          'user.nickname',
        ])
        .where({ status: true })
        .andWhere({ [query.type]: ILike(queryStr) })
        .take(5)
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(user: User): Promise<User[]> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          username: user.username,
          phone: user.phone,
          nickname: user.nickname,
        })
        .where({ userId: user.userId })
        .execute();
      return await this.findAllUsers();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(user: User): Promise<User[]> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ status: false })
        .where({ userId: user.userId })
        .execute();
      return await this.findAllUsers();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneUser(user: User): Promise<User[]> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .select(['user.userId', 'user.username', 'user.phone', 'user.nickname'])
        .where({ status: true })
        .andWhere({ username: user.username })
        .andWhere({ password: user.password })
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
