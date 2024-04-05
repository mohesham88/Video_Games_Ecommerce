import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/users/dto/Singin.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { LocalStrategy } from './strategies/local-strategy';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresth-jwt.guard';
import { Public } from 'src/utils/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService : UsersService) {}
  
  
  
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return await this.authService.signin(req.user);
  }



  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) : Promise<{user :UserEntity}> {
    return {user : await this.userService.createUser(createUserDto)};
  }



  @UseGuards(RefreshJwtGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }




}
