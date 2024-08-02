import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateOAuthUserDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @IsString()
  @Expose()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['google', 'facebook', 'x'])
  @Expose()
  identityProvider: 'google' | 'facebook' | 'x';
}
