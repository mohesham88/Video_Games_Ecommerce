import { Controller, Get, SetMetadata } from '@nestjs/common';

export const isPublicMetaData = 'isPublic';

export const Public = () => SetMetadata(isPublicMetaData, true);

// Reflect.defineMetadata()
/* @Controller()
export class AppController {

  @Get('isPublic')
  @Public()
  myHandler () {
    return { unauthorized: true };
  }

} */
