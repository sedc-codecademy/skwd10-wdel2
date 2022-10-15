import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDetails } from './helpers/contact-details.entity';
import { Course } from './helpers/course.entity';
import { Student } from './helpers/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course, ContactDetails])],
})
export class AcademyModule {}
