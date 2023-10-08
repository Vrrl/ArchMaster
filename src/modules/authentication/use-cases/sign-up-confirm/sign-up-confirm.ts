import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IAuthenticationService } from '@src/infra/authentication/services/authentication-service';

interface SignUpConfirmRequest {
  username: string;
  confirmationCode: string;
}

type SignUpConfirmResponse = void;

@injectable()
export class SignUpConfirmUseCase implements IUseCase<SignUpConfirmRequest, SignUpConfirmResponse> {
  constructor(@inject(TYPES.IAuthenticationService) private readonly authenticationService: IAuthenticationService) {}

  async execute({ username, confirmationCode }: SignUpConfirmRequest): Promise<SignUpConfirmResponse> {
    await this.authenticationService.signUpConfirm(username, confirmationCode);
  }
}
