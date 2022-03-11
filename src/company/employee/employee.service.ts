import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Employee } from '../../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAllEmployees(): Promise<Employee[]> {
    try {
      return await this.employeeRepository
        .createQueryBuilder('employee')
        .select([
          'employee.empId',
          'employee.empName',
          'employee.empUsername',
          'employee.empRole',
        ])
        .where({ empStatus: true })
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async insertEmployees(
    employeesList: Employee[],
  ): Promise<Employee[] | string> {
    try {
      const usernameList = employeesList.map(
        (employee) => employee.empUsername,
      );
      if (
        !(
          await this.employeeRepository
            .createQueryBuilder()
            .select()
            .where({ empUsername: In(usernameList) })
            .getMany()
        ).length
      ) {
        await this.employeeRepository
          .createQueryBuilder()
          .insert()
          .into(Employee)
          .values(employeesList)
          .execute();
      } else {
        return '此账户已存在！';
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchEmployees(employee: Employee): Promise<Employee[]> {
    const usernameStr = `%${employee.empUsername.split('').join('%')}%`;
    try {
      return await this.employeeRepository
        .createQueryBuilder('employee')
        .select([
          'employee.empId',
          'employee.empName',
          'employee.empUsername',
          'employee.empRole',
        ])
        .where({ empStatus: true })
        .andWhere({ empUsername: ILike(usernameStr) })
        .take(5)
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateEmployee(employee: Employee): Promise<Employee[]> {
    try {
      await this.employeeRepository
        .createQueryBuilder()
        .update(Employee)
        .set({
          empName: employee.empName,
          empRole: employee.empRole,
        })
        .where({ empId: employee.empId })
        .execute();
      return await this.findAllEmployees();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteEmployee(employee: Employee): Promise<Employee[]> {
    try {
      await this.employeeRepository
        .createQueryBuilder()
        .update(Employee)
        .set({ empStatus: false })
        .where({ empId: employee.empId })
        .execute();
      return await this.findAllEmployees();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneEmployee(employee): Promise<Employee[]> {
    try {
      return await this.employeeRepository
        .createQueryBuilder()
        .select()
        .where({ empUsername: employee.empUsername })
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
