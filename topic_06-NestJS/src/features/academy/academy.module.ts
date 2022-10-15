import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactDetails } from './helpers/contact-details.entity';
import { Course } from './helpers/course.entity';
import { Student } from './helpers/student.entity';
import { AcademyService } from './academy.service';
import { AcademyController } from './academy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course, ContactDetails])],
  providers: [AcademyService],
  controllers: [AcademyController],
})
export class AcademyModule {}
