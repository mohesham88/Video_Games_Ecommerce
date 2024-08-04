import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { isPublicMetaData } from "src/utils/decorators/public.decorator";


@Injectable()
export class JwtGuard extends AuthGuard('jwt'){
  constructor(private readonly reflector: Reflector) {
    super();
  }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(isPublicMetaData, [
      context.getClass(),
      context.getHandler(),
    ]);
    
    // console.log(context);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}