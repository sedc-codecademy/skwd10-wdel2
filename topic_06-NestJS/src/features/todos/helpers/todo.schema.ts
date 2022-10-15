import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ minlength: 8, required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  progress: number;

  @Prop({ maxlength: 150, required: true })
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
