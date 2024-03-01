import { Injectable } from '@nestjs/common';
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

}
