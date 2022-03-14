import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/entities/employee.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
