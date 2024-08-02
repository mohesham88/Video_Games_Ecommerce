import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/utils/common/user-roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
    ]);
    if (!requiredRole) {
      return true;
    }
    const user : UserEntity = context.switchToHttp().getRequest().user;
    // console.log(user)
    // console.log(requiredRole);
    
    return (this.mathcRoles(requiredRole, user));
    // return  user && user.role === requiredRole; 
  }



  mathcRoles(roles : string[], user: UserEntity): boolean {
    const userRole : UserRole = user.role;
    return roles.map((role : UserRole)=> userRole.includes(role)).find((val:boolean) => val == true);
 
  }
}