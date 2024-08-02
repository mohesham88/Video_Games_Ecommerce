import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEmail()
  email: string;

  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  /*   @IsOptional()
  @IsIn(["admin" , "customer"])
  role : "admin" | "customer"; */

  @IsString()
  @IsNotEmpty()
  address: string;
}
