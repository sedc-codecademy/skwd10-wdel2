import { IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  newProgress: string;
}
