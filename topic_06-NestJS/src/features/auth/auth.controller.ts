import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './helpers/auth-user.dto';

// http://localhost:4000/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // http://localhost:4000/auth/register
  @Post('/register')
  async registerUser(@Body() body: AuthUserDto, @Session() session: any) {
    const user = await this.authService.registerUser(body);
    session.userId = user._id.toString();
    // This is how you respond to the client side
    return { email: body.email, userId: user._id.toString() };
  }

  @Post('/login')
  async loginUser(@Body() body: AuthUserDto, @Session() session: any) {
    const user = await this.authService.loginUser(body.email, body.password);
    session.userId = user._id.toString();
    return { email: body.email, userId: user._id.toString() };
  }

  @Post('/logout')
  signoutUser(@Session() session: any) {
    session.userId = null;
  }
}
