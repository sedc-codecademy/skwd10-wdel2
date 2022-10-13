import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/features/auth/auth.service';

export interface User {
  email: string;
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
      session?: any;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.authService.findUserById(userId);
      req.currentUser = user;
    }
    next();
  }
}
