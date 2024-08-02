import { ExecutionContext, createParamDecorator } from "@nestjs/common";



export const CurrentUser = createParamDecorator(
  (data : unknown , ctx : ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // passport jwt guard already attaches the user in the request object
  }
)