import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/users/utils/decorators/current.user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { RatingValidator } from './utils/validators/rating.validation.pipe.';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body(new RatingValidator()) createReviewDto: CreateReviewDto, @CurrentUser() User : UserEntity) {
    return await this.reviewsService.create(createReviewDto, User);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user : UserEntity) {
    return this.reviewsService.remove(id, user);
  }
}
