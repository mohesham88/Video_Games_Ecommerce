import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TypeormExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,  @Request() req) {
    const userId = req.user.id;
    return this.productsService.update(id, userId , updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,  @Request() req) {
    const userId = req.user.id;
    return this.productsService.remove(id , userId);
  }
}
