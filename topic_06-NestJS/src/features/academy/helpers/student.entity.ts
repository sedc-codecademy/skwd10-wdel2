import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ContactDetails } from './contact-details.entity';
import { Course } from './course.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: string;

  @OneToOne(() => ContactDetails, (contactDetails) => contactDetails.student)
  contactDetails: ContactDetails;

  @ManyToOne(() => Course, (course) => course.student)
  @JoinColumn()
  course: Course;
}
