import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum roles {
  ADMIN = 'ADMIN',
  PERSONNEL = 'PERSONNEL',
  BUILDER = 'BUILDER',
  DESIGNER = 'DESIGNER',
  SERVICE = 'SERVICE',
  POWERLESS = 'POWERLESS',
}

@Entity('company.employee')
export class Employee {
  @PrimaryGeneratedColumn({ name: 'emp_id', type: 'integer' })
  empId?: number;

  @Column({ name: 'emp_name', type: 'character varying' })
  empName?: string;

  @Column({ name: 'emp_username', type: 'character varying' })
  empUsername?: string;

  @Column({ name: 'emp_password', type: 'character varying' })
  empPassword?: string;

  @Column({ name: 'emp_role', type: 'enum', enum: roles })
  empRole?: roles;

  @Column({ name: 'emp_status', type: 'boolean' })
  empStatus?: boolean;
}
