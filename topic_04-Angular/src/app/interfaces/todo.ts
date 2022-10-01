export interface Todo {
  _id?: string | number;
  title: string;
  progress: number;
  description: string;
  date: string | Date;
  email?: string;
}
