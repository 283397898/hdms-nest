import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public.project')
export class Project {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  projectId?: number;

  @Column({ name: 'address', type: 'character varying', length: 255 })
  address?: string;

  @Column({ name: 'progress', type: 'integer' })
  progress?: number;

  @Column({ name: 'username', type: 'character varying', length: 255 })
  username?: string;

  @Column({ name: 'area', type: 'integer' })
  area?: number;

  @Column({ name: 'structure', type: 'json' })
  structure?: object;

  @Column({ name: 'status', type: 'boolean' })
  status?: boolean;
}
