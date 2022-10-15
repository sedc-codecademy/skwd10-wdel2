import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './helpers/course.entity';
import { Repository } from 'typeorm';
import { Student } from './helpers/student.entity';
import { ContactDetails } from './helpers/contact-details.entity';
import {
  ContactDetailDto,
  CreateCourseDto,
  CreateStudentDto,
} from './helpers/academy.dtos';

@Injectable()
export class AcademyService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(ContactDetails)
    private detailsRepo: Repository<ContactDetails>,
  ) {}

  // [Course Logic Implementation]
  async createCourse(course: CreateCourseDto) {
    try {
      const newCourse = this.courseRepo.create({
        name: course.name,
        minStudents: parseInt(course.minStudents),
        maxStudents: parseInt(course.maxStudents),
        startDate: course.startDate,
        endDate: course.endDate,
        isActive: false,
      });
      return await this.courseRepo.save(newCourse);
    } catch (error) {}
  }

  async getCourseById(courseId: string) {
    try {
      return await this.courseRepo.findOne({
        where: { id: parseInt(courseId) },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // [Student Logic Implementation]

  async createStudent(student: CreateStudentDto) {
    try {
      const currentCourse = await this.getCourseById(student.courseId);

      if (!currentCourse) {
        throw new NotFoundException('Course does not exist!');
      }

      const newStudent = this.studentRepo.create({
        firstName: student.firstName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth,
        course: currentCourse,
      });

      return await this.studentRepo.save(newStudent);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getStudentById(studentId: string) {
    try {
      return await this.studentRepo.findOne({
        where: { id: parseInt(studentId) },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // [Contact Details Logic Implementation]
  async createContactDetails(contactDetail: ContactDetailDto) {
    try {
      const studentRef = await this.getStudentById(contactDetail.studentId);
      if (!studentRef) {
        throw new NotFoundException('Student does not exist!');
      }

      const studentDetail = this.detailsRepo.create({
        phoneNumber: contactDetail.phoneNumber,
        email: contactDetail.email,
        city: contactDetail.city,
        streetAddress: contactDetail.streetAddress,
        student: studentRef,
      });
      return await this.detailsRepo.save(studentDetail);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getStudentsForCourse(id: number) {
    // SELECT * FROM dbo.Course AS course
    // INNER JOIN Student AS student ON Student.id = course.studentId
    // WHERE course.id = id
    return await this.courseRepo
      .createQueryBuilder('course')
      .innerJoinAndMapMany(
        'course.student',
        Student,
        'student',
        'course.id = student.courseId',
      )
      .where('course.id = :courseId', { courseId: id })
      .getMany();
  }

  async activateCourse(courseId: string) {
    try {
      const courseRef = await this.getStudentsForCourse(parseInt(courseId));
      const course = courseRef[0];

      const numberOfStudents = course.student.length;
      if (numberOfStudents < course.minStudents) {
        throw new BadRequestException('Not enough students!');
      }
      course.isActive = true;

      return await this.courseRepo
        .createQueryBuilder()
        .update(Course)
        .set({ isActive: true })
        .where('id = :id', { id: parseInt(courseId) })
        .execute();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
