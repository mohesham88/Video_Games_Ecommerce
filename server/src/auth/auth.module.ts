import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategies/local-strategy';
/* import { JwtStrategy } from './strategies/jwt-strategy'; */
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { jwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken-strategy';

@Module({
  imports : [
    JwtModule.register(
    {
      secret : process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "600s",
      }
    }
  ),
  TypeOrmModule.forFeature([UserEntity]),
  UsersModule,
  PassportModule
],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UsersService, LocalAuthGuard, jwtStrategy, RefreshJwtStrategy]
})
export class AuthModule {}
