import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IAuthenticationService } from '@src/infra/authentication/services/authentication-service';
import { v4 as uuid } from 'uuid';
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
    const internalId = uuid();

    await this.authenticationService.signUp(email, username, password, internalId);
  }
}
