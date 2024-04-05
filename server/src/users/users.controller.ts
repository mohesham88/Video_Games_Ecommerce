import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ExecutionContext } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { SignInDto } from './dto/Singin.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './utils/common/user-roles.enum';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { MatchUserIdGuard } from 'src/auth/guards/match-user-id.guard';
import { Public } from 'src/utils/decorators/public.decorator';

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @Get("all")
  @UseGuards(RolesGuard)
  async findAll() :  Promise<{users : UserEntity[]}>{
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) : Promise<{user : UserEntity}> {
    return await this.usersService.findOne(id);
  }

/* 
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async test(@Request() req) {
    return req.user;
  } */



  @UseGuards(MatchUserIdGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) : Promise<{user : CreateUserDto}> {
    return {
      user : await this.usersService.update(id , updateUserDto)
    };
  }

  
}
