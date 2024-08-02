import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/utils/common/user-roles.enum';

@Controller('category')
// @UseGuards(JwtGuard, RolesGuard)
@UseGuards(RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}



  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() category: CategoryDto) : Promise<CategoryDto> {
    return await this.categoriesService.createCategory(category);
  }

  @Get(':id')
  async findCategory(@Param('id') id: string) : Promise<CategoryDto>{
    console.log(id);
    return await this.categoriesService.findOne(id);
  }


  @Get()
  async getAllCategories() : Promise<{categories : CategoryDto[]}> {
    const categories = await this.categoriesService.findAll();

    return {
      categories : categories
    };
  }
}
