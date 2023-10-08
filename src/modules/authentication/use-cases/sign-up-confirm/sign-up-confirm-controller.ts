import { inject, injectable } from 'inversify';
import { z } from 'zod';
import * as httpStatus from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller } from '@core/infra/controller';
import { SignUpConfirmUseCase } from './sign-up-confirm';
import TYPES from '@src/core/types';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';

@injectable()
export class SignUpConfirmController extends Controller {
  constructor(@inject(TYPES.SignUpConfirmUseCase) private readonly signUpConfirmUseCase: SignUpConfirmUseCase) {
    super();
  }

  authenticationLevels: AuthenticationLevel[] = [];

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        confirmationCode: z.string(),
        username: z.string(),
      }),
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, confirmationCode } = httpRequest.body;

    await this.signUpConfirmUseCase.execute({
      username,
      confirmationCode,
    });

    return httpStatus.ok();
  }
}
