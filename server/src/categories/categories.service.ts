import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>){}



  async createCategory(categoryDto: CategoryDto): Promise<CategoryEntity> {
    const category = this.categoryRepository.create([categoryDto]);

    return [...await this.categoryRepository.save(category)][0];
  }


  async findOne(id : string) : Promise<CategoryEntity> {
    const category : CategoryEntity = await this.categoryRepository.findOneBy({id});

    if(!category)
    throw new NotFoundException("category id is not found");

    return category;
  }

  async findAll() : Promise<CategoryEntity[]> {
    const categories : CategoryEntity[] = await this.categoryRepository.find();
    return categories;
  }

}
