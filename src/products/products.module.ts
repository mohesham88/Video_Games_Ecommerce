import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

import { CategoriesModule } from 'src/categories/categories.module';
import { ReviewsService } from 'src/reviews/reviews.service';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([ProductEntity]),
    CategoriesModule,
    forwardRef(() => ReviewsModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports : [
    ProductsService,
  ]
})
export class ProductsModule {}
