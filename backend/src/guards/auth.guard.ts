import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { User } from '../users/users.entity';
import { UserStatus } from '../enums/user.status';

interface RequestWithUser extends Request {
  user?: User;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const username = request.params.username as string | undefined;

    if (!username) {
      throw new UnauthorizedException('Username is required');
    }

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.status === UserStatus.DELETED) {
      throw new UnauthorizedException('User has been deleted');
    }

    if (user.status === UserStatus.DISABLED) {
      throw new ForbiddenException('User has been disabled');
    }

    return true;
  }
}
