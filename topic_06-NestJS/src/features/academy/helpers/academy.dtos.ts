import { IsEmail, IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  minStudents: string;

  @IsString()
  maxStudents: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  courseId: string;
}

export class ContactDetailDto {
  @IsPhoneNumber('MK')
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  city: string;

  @IsString()
  streetAddress: string;

  @IsString()
  studentId: string;
}
