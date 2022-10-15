import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './features/auth/auth.module';
import { TodosModule } from './features/todos/todos.module';
import { AcademyModule } from './features/academy/academy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './features/academy/helpers/student.entity';
import { Course } from './features/academy/helpers/course.entity';
import { ContactDetails } from './features/academy/helpers/contact-details.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    AuthModule,
    TodosModule,
    AcademyModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestdb'),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'testdb.sqlite',
      entities: [Student, Course, ContactDetails],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['helloworld'],
        }),
      )
      .forRoutes('*');
  }
}
