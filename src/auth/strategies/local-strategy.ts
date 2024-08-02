import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService) {
    super({
      "usernameField": "email"
    });
  }


  async validate(email: string, password: string): Promise<any> {
    // validate function expects arguments(username, password) signuture to change it to email we need to change the usernameField to email in superclass
    const user = await this.authService.validateUser(email, password);


    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }

}