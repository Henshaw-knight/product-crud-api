import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

interface ResponseData {
  message?: string;
  [key: string]: unknown;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: ResponseData) => ({
        success: true,
        statusCode,
        message: data?.message ?? 'Request successful',
        data: data?.message ? undefined : data,
      })),
    );
  }
}
