import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus } from '../enums/user.status';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column('json', { default: ['regular_user'] })
  roles: string[];

  @Column({
    type: 'varchar',
    enum: UserStatus,
    default: UserStatus.ENABLED,
  })
  status: UserStatus;
}
