import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthUserDto } from './helpers/auth-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './helpers/auth.schema';
import { Model } from 'mongoose';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(credentials: AuthUserDto) {
    const { email, password } = credentials;

    const foundUser = await this.findUserByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email already in use!');
    }

    // Hash and salt the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });
    return user.save();
  }

  async loginUser(email: string, password: string) {
    const foundUser = await this.findUserByEmail(email);
    if (!foundUser) {
      throw new NotFoundException('User does not exist!');
    }
    const [salt, storedHash] = foundUser.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect password!');
    }
    return foundUser;
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findUserById(id: string) {
    const {email, _id} = await this.userModel.findById(id).exec();
    return {email, _id};
  }
}
