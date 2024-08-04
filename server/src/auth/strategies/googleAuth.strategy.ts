import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class googleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/redirect`,
      scope: ['profile', 'email'],
      prompt: 'none',
    });
  }

  /**
   *  _json: {
api-1       |     sub: '105061459046217278377',
api-1       |     name: 'Mostafa Hesham',
api-1       |     given_name: 'Mostafa',
api-1       |     family_name: 'Hesham',
api-1       |     picture: 'https://lh3.googleusercontent.com/a/ACg8ocJVCgFQZBwDITVqBu_8NOjd9F-aUM00lfkKJlYnFwl2EQcKYQ=s96-c',
api-1       |     email: 'mostafaasd2018@gmail.com',
api-1       |     email_verified: true
api-1       |   }
   */
  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { sub, name, picture, email } = profile._json;

    console.log('profile:', profile);
    const newUser = await this.usersService.createOAuthUser({
      id: sub,
      username: name,
      avatar: picture,
      identityProvider: 'google',
      email,
    });

    return newUser;
  }
}