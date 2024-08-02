import { Inject, Injectable, NotFoundException, UnauthorizedException, UseGuards, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { ReviewsService } from 'src/reviews/reviews.service';


@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,

    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService
    ){}
  
  async create(createProductDto: CreateProductDto, userId : unknown) {

    const categoryId = createProductDto.category;
    

    const category = await this.categoryService.findOne(String(categoryId));


    const product =  this.productRepository.create({
      ...createProductDto,
      addedBy : userId,
    });
    return await this.productRepository.save(product);
  }

  async findAll() : Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOneById(id: string) {
    const product = await this.productRepository.findOneBy({id});

    if(!product)
        throw new NotFoundException(`Product ${id} not found`);
    return product;
  }


  async findOneBySlug(slug: string) : Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({slug});
    if(!product)
        throw new NotFoundException(`Product not found`);
    return product;
  }

  
  async update(productId : string , updateProductDto : UpdateProductDto) {
    return this.productRepository.save({ id : productId, ...updateProductDto});
  }

  async remove(product: ProductEntity) {
    return await this.productRepository.remove([product]);
  }


  async findOneWithRelations(id : string){
    const productsPromise = await this.productRepository.find({
      where : {
        id : id,
      },
      relations : {
        category : true,
        addedBy : true,
      },
      loadEagerRelations : true,
    })
    return productsPromise[0];
  }

  async findAllProductReviews(productId : string){

    return await this.reviewsService.findAllProductReviews(productId);
  }
}
