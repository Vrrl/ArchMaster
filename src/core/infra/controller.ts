import { HttpRequest, HttpResponse } from '../../infra/http/interfaces./../../core/infra/http'
import { badRequest, serverError } from './helpers/http'
import { make } from 'simple-body-validator';
import { HttpException } from '@src/core/infra/errors/http';

export abstract class ControllerFactory {
  constructor() {}

  abstract makeController(): Controller 

}

export abstract class Controller {

  constructor() {}

  abstract validationRules(): Record<string, string>
  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationRules = this.validationRules()
      if (validationRules) {
        const validator = make().setData(httpRequest).setRules(validationRules)
        
        if (!validator.validate()) return badRequest(validator.errors().all());
      }
      return await this.perform(httpRequest);
    } catch (error) {
      if (error instanceof HttpException) {
        return {
          statusCode: error.statusCode,
          body: { message: error.message }
        }
      }

      console.log(error);
      return serverError();
    }
  }

}
