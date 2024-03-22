import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";




@Injectable()
export class MatchUserIdWithProductGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
      
    const request  = context.switchToHttp().getRequest();
    const {user} = request;
    const {id} = request.params;
    // console.log(`${id} ${user.id}`)
    return (user.id === id);
  }
}