import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoriesService } from 'src/categories/categories.service';
import { MatchUserIdGuard } from 'src/auth/guards/match-user-id.guard';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService
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

  
  async update(productId: string, userId : string ,updateProductDto: UpdateProductDto) {

    const product = await this.findOneWithRelations(productId);

    if(String(product.addedBy.id) !== userId){
      throw new UnauthorizedException(`User Doesn't have access to update this product`);
    }


    return this.productRepository.save({ id : productId, ...updateProductDto});
  }

  async remove(id: string, userId : string) {
    // const product = await this.productRepository.findOneBy({id});
    
    const product = await this.findOneWithRelations(id);
    console.log({...product})
    if(!product){
      throw new NotFoundException(`Product with id ${id} doesn't exist`);
    }

    if(String(product.addedBy.id) !== userId){
      throw new UnauthorizedException(`User Doesn't have access to delete this product`);
    }

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
}
