import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Employee } from '../../entities/employee.entity';
class QueryData {
  type: string;
  data: string;
}
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
          'employee.empPassword',
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
      const empList = await this.employeeRepository
        .createQueryBuilder()
        .select()
        .where({ empUsername: In(usernameList) })
        .getMany();
      if (!empList.length) {
        await this.employeeRepository
          .createQueryBuilder()
          .insert()
          .into(Employee)
          .values(employeesList)
          .execute();
      } else {
        const usernames = empList.map((emp) => emp.empUsername).join('，');
        return `${usernames}已存在！`;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchEmployees(query: QueryData): Promise<Employee[]> {
    const queryStr = `%${query.data.split('').join('%')}%`;
    try {
      return await this.employeeRepository
        .createQueryBuilder('employee')
        .select([
          'employee.empId',
          'employee.empName',
          'employee.empPassword',
          'employee.empUsername',
          'employee.empRole',
        ])
        .where({ empStatus: true })
        .andWhere({ [query.type]: ILike(queryStr) })
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

  async findOneEmployee(employee: Employee): Promise<Employee[]> {
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
        .andWhere({ empUsername: employee.empUsername })
        .andWhere({ empPassword: employee.empPassword })
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
