import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength, isString, isUUID } from "class-validator";
import { UUID } from "crypto";
import { CategoryEntity } from "../entities/category.entity";




export class CategoryDto{

  @IsNotEmpty()
  @IsString()
  title : string;
  
  
  @IsString()
  @MinLength(12)
  @MaxLength(500)
  description : string;

  @IsOptional()
  @IsUUID()
  parentCategory : CategoryEntity;
}