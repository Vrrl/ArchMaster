import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { created } from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller } from '@core/infra/controller';
import { SignUpUseCase } from './sign-up';
import TYPES from '@src/core/types';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';

@injectable()
export class SignUpController extends Controller {
  constructor(@inject(TYPES.SignUpUseCase) private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  authenticationLevels: AuthenticationLevel[] = [];

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        email: z.string(),
        password: z.string(),
        username: z.string(),
      }),
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password, username } = httpRequest.body;

    await this.signUpUseCase.execute({
      email,
      password,
      username,
    });

    return created();
  }
}
