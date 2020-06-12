import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Mail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column()
  to: string;

  @Column()
  subject: string;

  @ManyToOne(
    type => User,
    user => user.mails,
    { eager: false },
  )
  user: User;
}
