import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(ReviewEntity) 
    private readonly reviewsRepository: Repository<ReviewEntity>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService
  ){}


  async create(createReviewDto: CreateReviewDto, currentUser : UserEntity) : Promise<ReviewEntity> {
    const {id : userId} = currentUser;

    createReviewDto.user = currentUser;
    
    const product = await this.productService.findOneById(String(createReviewDto.product));
    if(!product){
      throw new NotFoundException(`Product doesn't exist`)
    }

    // check if the user has already made a review for this product
    const review = await this.findOneReviewByProductIdAndUserId( product.id, userId);
    
    if(review){
      throw new BadRequestException(`You have made a review for this product`)
    }

    // create a new review
    const newReview = this.reviewsRepository.create(createReviewDto);

    return await this.reviewsRepository.save(newReview);
  }


  async findOneById(id : string) : Promise<ReviewEntity>{
    return await this.reviewsRepository.findOne(
      {
        where : {
          id,
        },
        relations : {
          user : true,
          product : {
            category : true,
          },
        }
      }
    )
    
  }

  async findOneReviewByProductIdAndUserId(productId : string , userId? : string) : Promise<ReviewEntity>{
    return await this.reviewsRepository.findOne(
      {
        where : {
          user : {
            id : userId,
          },
          product : {
            id : productId,
          },
        },
        relations : {
          user : true,
          product : {
            category : true,
          },
        }
    })
  }


  async findAllProductReviews(productId : string) {
    return await this.reviewsRepository.find({
      where : {
        product : {
          id : productId,
        }
      }
    })
  }


  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: string, user : UserEntity) {
    const review = await this.findOneById(id);
    
    
    if(review){
      console.log(review)
      console.log(user)
      if(review.user.id !== user.id){
          return new UnauthorizedException();
        }else{
          var reviewRemoved = await this.reviewsRepository.remove(review);

        }
      }
    else{
      return new NotFoundException(`Review Not Found`)
    }
    return reviewRemoved;
  }
}
