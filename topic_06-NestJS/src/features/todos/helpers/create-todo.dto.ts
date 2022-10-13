import { IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  progress: string;

  @IsString()
  description: string;
}
