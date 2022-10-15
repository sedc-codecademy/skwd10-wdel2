import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  minStudents: number;

  @Column()
  maxStudents: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => Student, (student) => student.course)
  student: Student[];
}
