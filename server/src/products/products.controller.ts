import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Request, forwardRef, Inject } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TypeormExceptionFilter } from 'src/utils/filters/typeorm-exception.filter';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { MatchUserIdWithProductGuard } from './guards/match-user-with-product.guard';
import { ProductEntity } from './entities/product.entity';
import { ReviewsService } from 'src/reviews/reviews.service';

@Controller('products')
// @UseGuards(JwtGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService
  ) {}

  @Post()
  @UseFilters(new TypeormExceptionFilter)
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    const userId = req.user.id;
    return await this.productsService.create(createProductDto, userId);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('id/:id')
  async findOneById(@Param('id') id: string) {
    return await this.productsService.findOneById(id);
  }

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return await this.productsService.findOneBySlug(slug);
  }


  
  @Patch(':id')
  @UseFilters(new TypeormExceptionFilter)
  @UseGuards(MatchUserIdWithProductGuard)
  async update(@Request() req, @Body() updateProductDto : UpdateProductDto) {
    const productId : string = req.product.id;
    return this.productsService.update(productId, updateProductDto);
  }
  
  @Delete(':id')
  @UseGuards(MatchUserIdWithProductGuard)
  async remove(@Param('id') id: string,  @Request() req) {
    const product : ProductEntity = req.product;
    return this.productsService.remove(product);
  }



  // Get all reviews for a product
  @Get(':id/reviews')
  async getProductReviews(@Param('id') productId : string){
    return await this.productsService.findAllProductReviews(productId);
  }
}
