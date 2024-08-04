import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(private readonly authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`
    })
  }

  
  
  async validate(payload: any): Promise<any>{
    let jwt = ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log(jwt)
    return await this.authService.getUserById(payload.sub.id); 
  }


}