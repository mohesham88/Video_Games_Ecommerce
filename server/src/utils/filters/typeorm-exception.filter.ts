import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter {


  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR, message = "Internal Server Error";


    const typeromErrorCodes = {
      UNIQUE : "23505",

    }

    switch((exception as any).code){

      // typeorm exceptions
      case typeromErrorCodes.UNIQUE:
        status = 400;
        message = `Unique constraint violated : ${(exception as any).detail}`;
        // console.log(exception);
        break;
        
    }


    response.status(status).json({
      message : [
        message,
      ],
      status,
    })

    /* if (exception.constraint === 'UQ_26c9336d231c4e90419a5954bd7') {
      response.status(400).json({
        message: 'Duplicate key value violates unique constraint',
        constraint: exception.constraint,
        detail: exception.detail,
      });
    } else {
      // Handle other database errors
      response.status(500).json({
        message: 'Internal server error',
      });
    } */
  }
}