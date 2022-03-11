import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../../entities/employee.entity';

@Controller('company/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('list')
  async getAllEmployees() {
    return this.employeeService.findAllEmployees();
  }

  @Post()
  async insertEmployees(@Body() employeesList: Employee[]) {
    return this.employeeService.insertEmployees(employeesList);
  }

  @Get('search')
  async searchEmployees(@Query() employee: Employee) {
    return this.employeeService.searchEmployees(employee);
  }
}
