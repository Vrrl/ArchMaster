import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IAuthenticationService } from '@src/infra/authentication/services/authentication-service';
import { IOAuthToken } from '../../dtos/oauth-token';

interface LogInRequest {
  username: string;
  password: string;
}

type LogInResponse = IOAuthToken;

@injectable()
export class LogInUseCase implements IUseCase<LogInRequest, LogInResponse> {
  constructor(@inject(TYPES.IAuthenticationService) private readonly authenticationService: IAuthenticationService) {}

  async execute({ username, password }: LogInRequest): Promise<LogInResponse> {
    const oauthToken = await this.authenticationService.logIn(username, password);

    return oauthToken;
  }
}
