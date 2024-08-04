import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {hash} from 'bcrypt'
import { SignInDto } from './dto/Singin.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}

  async createUser(userToCreate : CreateUserDto) : Promise<UserEntity>{
    const userExist = await this.findUserByEmail(userToCreate.email);
    if(userExist) { 
      throw new BadRequestException(`Email is already used`)
    }

    let user = this.userRepository.create(userToCreate as UserEntity);
    user = await this.userRepository.save(user);
    delete(user.password)
    return user;
  }



  async findAll() : Promise<{users : UserEntity[]}>{
    return {users : await this.userRepository.find()};
  }

  async findOne(id: string) : Promise<{user : UserEntity}> {
    const user =  await this.userRepository.findOneBy({
      id : id,
    })


    if(!user){
      throw new NotAcceptableException("user doesn't exist");
    }

    return {user};
  }

  async update(id : string, updateUserDto: UpdateUserDto) : Promise<CreateUserDto>  {

    const user = await this.userRepository.createQueryBuilder().update("Users").set(updateUserDto).where("id = :id", {id : id}).returning("*").updateEntity(true).execute();
    
    console.log(user)
    
    const {raw : [updatedUser]}  = user;
    delete updatedUser.password;


    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async findUserByEmail(email: string) : Promise<UserEntity>{
    const user = await this.userRepository.find({
      where : {
        email : email
      }
    })
    return user[0]; 
  }



  async validateUserCredentials(user : SignInDto) {
    const userExist = await this.userRepository.createQueryBuilder('Users').addSelect('Users.password').where('Users.email=:email', {email : user.email}).getOne();

    if(!userExist){
      return null;
    }

    const isPasswordValid = await bcrypt.compare(user.password, userExist.password);
    if(isPasswordValid)
      return userExist;
    else
      return null;
  }

}
