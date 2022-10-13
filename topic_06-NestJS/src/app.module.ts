import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './features/auth/auth.module';
import { TodosModule } from './features/todos/todos.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestdb'), AuthModule, TodosModule],
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
