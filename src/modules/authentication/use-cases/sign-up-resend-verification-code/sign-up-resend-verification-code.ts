import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IAuthenticationService } from '@src/infra/authentication/services/authentication-service';

interface SignUpResendVerificationCodeRequest {
  username: string;
}

type SignUpResendVerificationCodeResponse = void;

@injectable()
export class SignUpResendVerificationCodeUseCase
  implements IUseCase<SignUpResendVerificationCodeRequest, SignUpResendVerificationCodeResponse>
{
  constructor(@inject(TYPES.IAuthenticationService) private readonly authenticationService: IAuthenticationService) {}

  async execute({ username }: SignUpResendVerificationCodeRequest): Promise<SignUpResendVerificationCodeResponse> {
    await this.authenticationService.signUpResendVerificationCode(username);
  }
}
