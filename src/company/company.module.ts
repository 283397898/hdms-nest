import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmployeeModule, AuthModule],
})
export class CompanyModule {}
