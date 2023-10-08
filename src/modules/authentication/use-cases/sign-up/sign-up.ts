import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IAuthenticationService } from '@src/infra/authentication/services/authentication-service';

interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

type SignUpResponse = void;

@injectable()
export class SignUpUseCase implements IUseCase<SignUpRequest, SignUpResponse> {
  constructor(@inject(TYPES.IAuthenticationService) private readonly authenticationService: IAuthenticationService) {}

  async execute({ email, username, password }: SignUpRequest): Promise<SignUpResponse> {
    await this.authenticationService.signUp(email, username, password);
  }
}
