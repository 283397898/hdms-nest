import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SHA256 } from 'crypto-js';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../../entities/employee.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const emp = (
      await this.employeeService.findOneEmployee({
        empUsername: username,
        empPassword: SHA256(password).toString(),
      })
    )[0];
    if (emp) {
      return emp;
    }
    return null;
  }

  async login(employee: Employee) {
    const payload = { employee };
    return {
      token: this.jwtService.sign(payload, { expiresIn: '7day' }),
      employee,
    };
  }

  async aa(token) {
    const user = this.jwtService.verify(token);
    console.log(user);
  }
}
