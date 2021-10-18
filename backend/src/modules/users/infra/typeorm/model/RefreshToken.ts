import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('refresh_token')
class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  expiresIn: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default RefreshToken;
