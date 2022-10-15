import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { AcademyService } from './academy.service';
import {
  ContactDetailDto,
  CreateCourseDto,
  CreateStudentDto,
} from './helpers/academy.dtos';

@Controller('academy')
export class AcademyController {
  constructor(private academyService: AcademyService) {}

  @Post('/course')
  async postNewCourse(@Body() body: CreateCourseDto) {
    return await this.academyService.createCourse(body);
  }

  @Post('/student')
  async postNewStudent(@Body() body: CreateStudentDto) {
    return await this.academyService.createStudent(body);
  }

  //   @Post("/student/:id") <- you can go with this as well
  @Post('/details')
  async postContactDetails(@Body() body: ContactDetailDto) {
    return await this.academyService.createContactDetails(body);
  }

  @Get('/course/students/:id')
  async getStudentsForCourse(@Param('id') courseId: string) {
    return await this.academyService.getStudentsForCourse(parseInt(courseId));
  }

  @Patch('/course/:id')
  async updateCourseIsActive(@Param('id') courseId: string) {
    return await this.academyService.activateCourse(courseId);
  }
}
