import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN = 'ADMIN',
  PERSONNEL = 'PERSONNEL',
  BUILDER = 'BUILDER',
  DESIGNER = 'DESIGNER',
  SERVICE = 'SERVICE',
  POWERLESS = 'POWERLESS',
}

@Entity('public.employee')
export class Employee {
  @PrimaryGeneratedColumn({ name: 'emp_id', type: 'integer' })
  empId?: number;

  @Column({ name: 'emp_name', type: 'character varying', length: 255 })
  empName?: string;

  @Column({ name: 'emp_username', type: 'character varying', length: 255 })
  empUsername?: string;

  @Column({ name: 'emp_password', type: 'character varying', length: 255 })
  empPassword?: string;

  @Column({ name: 'emp_role', type: 'enum', enum: Role })
  empRole?: Role;

  @Column({ name: 'emp_status', type: 'boolean' })
  empStatus?: boolean;
}
