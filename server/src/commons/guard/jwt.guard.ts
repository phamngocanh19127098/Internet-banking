import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';

import { ROLES_KEY } from 'src/commons/decorator/roles.decorator';
import { Role } from 'src/api/users/entity/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    return super.canActivate(context);
  }
}
