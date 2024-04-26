import { ValidationPipe } from "@nestjs/common";
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min, isEmpty, min } from "class-validator";
import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";



export class CreateReviewDto {

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces : 1, // ex. 3.5
  })
  @Max(5)
  @Min(0)
  
  rating : number;


  @IsOptional()
  @Length( 0 , 120)
  comment : string;

  @IsNotEmpty({
    message : 'Product id is required'
  })
  @IsUUID()
  product : ProductEntity ;

  
  
  user : UserEntity;




}
