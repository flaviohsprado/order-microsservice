import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('HttpExceptionsFilter');
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status: HttpStatus = exception.getStatus();

    this.logger.error(exception);

    const res: any = exception.getResponse();
    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Sorry we are experiencing technical problems.'
        : res.message || '';

    const error =
      exception instanceof Error ? exception.message : exception.message.error;

    if (status === HttpStatus.BAD_REQUEST)
      return { status, error: res.message };

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
