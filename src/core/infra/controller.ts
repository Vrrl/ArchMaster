import { HttpRequest, HttpResponse } from '@core/infra/http';
import * as httpStatus from './helpers/http-status';
import { HttpException } from '@src/core/infra/errors/http';
import { z } from 'zod';
import { injectable, inject } from 'inversify';
import { AuthenticationLevel } from './authentication/authentication-level';
import TYPES from '../types';
import { IAuthenticationService } from '@src/infra/authentication/services/authentication-service';
import container from '../injector';

@injectable()
export abstract class Controller {
  constructor() {
    this.authenticationService = container.get<IAuthenticationService>(TYPES.IAuthenticationService);
  }

  protected authenticationService: IAuthenticationService;

  authenticationLevels?: AuthenticationLevel[];

  abstract get requestSchema(): z.AnyZodObject;
  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (this.authenticationLevels?.length) {
        debugger;
        const user = await this.authenticationService.getUser('teste2');
        if (!user) return httpStatus.Unauthorized();
      }
      if (this.requestSchema) {
        const validator = await this.requestSchema.safeParseAsync(httpRequest);

        if (!validator.success) return httpStatus.badRequest(validator.error.issues);
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
      return httpStatus.serverError();
    }
  }
}
