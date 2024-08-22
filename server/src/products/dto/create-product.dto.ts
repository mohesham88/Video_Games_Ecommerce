import { IsArray, IsDate, IsDateString, IsDecimal, IsEmpty, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength,  } from "class-validator";
import { UUID } from "crypto";
import { CategoryEntity } from "src/categories/entities/category.entity";


export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  name : string;


  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
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
  @IsArray({
    
  })
  categories : CategoryEntity[]; // array of category ids;

  @IsDateString({})
  release_date : Date;

  @IsArray()
  platforms : string[]; 





}
