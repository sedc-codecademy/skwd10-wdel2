import { IsString, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
