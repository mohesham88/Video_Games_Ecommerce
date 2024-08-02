import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RatingValidator implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    // Additional validation for the rating property
    if (typeof value.rating !== 'undefined' && !this.isValidRating(value.rating)) {
      throw new BadRequestException('Invalid rating. Ratings must be whole numbers or include half increments (e.g., 2, 2.5, 3, 3.5).');
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [ Number];
    return !types.includes(metatype);
  }

  private isValidRating(rating: number): boolean {
    // Check if the rating is a half or whole floating-point number
    return rating % 0.5 === 0 || Number.isInteger(rating);
  }
}
