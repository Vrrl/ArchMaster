import { HttpRequest, HttpResponse } from '../../infra/http/interfaces./../../core/infra/http';
import { badRequest, serverError } from './helpers/http';
import { make } from 'simple-body-validator';
import { HttpException } from '@src/core/infra/errors/http';
import { z } from 'zod';
import { injectable } from 'inversify';
export abstract class ControllerFactory {
  constructor() {}

  abstract makeController(): Controller;
}

@injectable()
export abstract class Controller {
  constructor() {}

  abstract get requestSchema(): z.AnyZodObject;
  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (this.requestSchema) {
        const validator = await this.requestSchema.safeParseAsync(httpRequest);

        if (!validator.success) return badRequest(validator.error.issues);
      }
      return await this.perform(httpRequest);
    } catch (error) {
      if (error instanceof HttpException) {
        return {
          statusCode: error.statusCode,
          body: { message: error.message },
        };
      }

      console.log(error);
      return serverError();
    }
  }
}
