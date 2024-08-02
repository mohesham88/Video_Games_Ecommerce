import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
  constructor(private readonly authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`
    })
  }


  async validate(payload: any): Promise<any>{
    return {
      user :payload.sub,
      email : payload.email
    }
  }


}