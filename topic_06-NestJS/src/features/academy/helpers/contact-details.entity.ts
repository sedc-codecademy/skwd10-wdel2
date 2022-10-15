import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class ContactDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  streetAddress: string;

  @OneToOne(() => Student, (student) => student.contactDetails)
  @JoinColumn()
  student: Student;
}
