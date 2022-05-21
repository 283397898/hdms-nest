import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee, Role } from '../../entities/employee.entity';
import { Roles } from '../roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('company/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.PERSONNEL)
  @Get('list')
  async getAllEmployees() {
    return this.employeeService.findAllEmployees();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.PERSONNEL)
  @Post()
  async insertEmployees(@Body() employeesList: Employee[]) {
    const data = await this.employeeService.insertEmployees(employeesList);
    if (typeof data === 'string') {
      throw new HttpException(data, HttpStatus.BAD_REQUEST);
    } else {
      return data;
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.PERSONNEL)
  @Get('search')
  async searchEmployees(@Query() queryData) {
    return this.employeeService.searchEmployees(queryData);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.PERSONNEL)
  @Put()
  async updateEmployee(@Body() employee: Employee) {
    return this.employeeService.updateEmployee(employee);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.PERSONNEL)
  @Delete()
  async deleteEmployee(@Body() employee: Employee) {
    return this.employeeService.deleteEmployee(employee);
  }
}
