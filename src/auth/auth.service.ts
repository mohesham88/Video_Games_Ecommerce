import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/users/dto/Singin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, Password: string) {
    const user = await this.userService.validateUserCredentials({
      email,
      password: Password,
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(
    user: UserEntity,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    const payload = {
      email: user.email,

      sub: {
        id: user.id,
        username: user.username,
      },
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(user: UserEntity): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,

      sub: {
        id: user.id,
        username: user.username,
      },
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async getUserById(id: string): Promise<UserEntity> {
    let userDetails = await this.userService.findOne(id);
    const user = userDetails.user;
    return user;
  }
}
