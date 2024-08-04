import { Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt-auth.guard';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), 
    UsersModule, AuthModule, CategoriesModule, ProductsModule, ReviewsModule],
  controllers: [],
  providers: [
    {
      provide : APP_GUARD,
      useClass : JwtGuard,
    }
  ],
})
export class AppModule {

}
