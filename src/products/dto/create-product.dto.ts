import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength,  } from "class-validator";
import { CategoryEntity } from "src/categories/entities/category.entity";


export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  name : string;


  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(800)
  description : string;



  @IsNotEmpty()
  @IsPositive()
  @IsNumber({
    maxDecimalPlaces : 2, 
  })
  price : number;
  
  
  @IsNotEmpty()
  @Min(0)
  stock : number;

  @IsArray()
  images : string[];  // array of urls

  @IsNotEmpty()
  @IsUUID()
  category : CategoryEntity;


}
