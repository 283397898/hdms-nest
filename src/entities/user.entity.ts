import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public.user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'integer' })
  userId?: number;

  @Column({ name: 'username', type: 'character varying', length: 255 })
  username?: string;

  @Column({ name: 'password', type: 'character varying', length: 255 })
  password?: string;

  @Column({ name: 'phone', type: 'character varying', length: 255 })
  phone?: string;

  @Column({ name: 'status', type: 'boolean' })
  status?: boolean;

  @Column({ name: 'nickname', type: 'character varying' })
  nickname?: boolean;
}
