import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/utils/common/user-roles.enum';

@Controller('category')
@UseGuards(JwtGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}



  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() category: CategoryDto) : Promise<CategoryDto> {
    return await this.categoriesService.createCategory(category);
  }
}
