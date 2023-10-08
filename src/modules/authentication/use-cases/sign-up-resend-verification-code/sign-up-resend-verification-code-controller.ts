import { inject, injectable } from 'inversify';
import { z } from 'zod';
import * as httpStatus from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller } from '@core/infra/controller';
import { SignUpResendVerificationCodeUseCase as SignUpResendVerificationCodeUseCase } from './sign-up-resend-verification-code';
import TYPES from '@src/core/types';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';

@injectable()
export class SignUpResendVerificationCodeController extends Controller {
  constructor(
    @inject(TYPES.SignUpResendVerificationCodeUseCase)
    private readonly signUpResendVerificationCodeUseCase: SignUpResendVerificationCodeUseCase,
  ) {
    super();
  }

  authenticationLevels: AuthenticationLevel[] = [];

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        username: z.string(),
      }),
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username } = httpRequest.body;

    await this.signUpResendVerificationCodeUseCase.execute({
      username,
    });

    return httpStatus.ok();
  }
}
