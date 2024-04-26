import { Module, forwardRef } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ReviewEntity]),
    forwardRef(() => ProductsModule),
    // ProductsModule,
  ],
  controllers: [ReviewsController],
  providers: [
    ReviewsService
  ],
  exports : [
    ReviewsService
  ]
})
export class ReviewsModule {} 
