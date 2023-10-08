import { inject, injectable } from 'inversify';
import { IAuthenticationService } from '../authentication-service';
import TYPES from '@src/core/types';
import {
  CognitoIdentityProvider,
  ConfirmSignUpCommandInput,
  InitiateAuthCommandInput,
  ResendConfirmationCodeCommandInput,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { throwIfUndefinedOrEmptyString } from '@src/core/infra/helpers/validation';

@injectable()
export class CognitoService implements IAuthenticationService {
  USER_POOL_ID: string;
  CLIENT_ID: string;

  constructor(
    @inject(TYPES.CognitoIdentityProvider) private readonly cognitoIdentityProvider: CognitoIdentityProvider,
  ) {
    // Only if variables have been setup already
    if (process.env.NODE_ENV) {
      this.USER_POOL_ID = throwIfUndefinedOrEmptyString(process.env.COGNITO_USER_POOL_ID);
      this.CLIENT_ID = throwIfUndefinedOrEmptyString(process.env.COGNITO_CLIENT_ID);
    }
  }

  async signUp(email: string, username: string, password: string): Promise<void> {
    const params = {
      UserPoolId: this.USER_POOL_ID,
      ClientId: this.CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'nickname',
          Value: username,
        },
      ],
    } as SignUpCommandInput;

    await this.cognitoIdentityProvider.signUp(params);
  }

  async signUpConfirm(username: string, confirmationCode: string): Promise<void> {
    const params = {
      UserPoolId: this.USER_POOL_ID,
      ClientId: this.CLIENT_ID,
      Username: username,
      ConfirmationCode: confirmationCode,
    } as ConfirmSignUpCommandInput;

    await this.cognitoIdentityProvider.confirmSignUp(params);
  }

  async signUpResendVerificationCode(username: string): Promise<void> {
    const params = {
      UserPoolId: this.USER_POOL_ID,
      ClientId: this.CLIENT_ID,
      Username: username,
    } as ResendConfirmationCodeCommandInput;

    await this.cognitoIdentityProvider.resendConfirmationCode(params);
  }

  async logIn(username: string, password: string): Promise<any> {
    const params = {
      UserPoolId: this.USER_POOL_ID,
      ClientId: this.CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    } as InitiateAuthCommandInput;

    return this.cognitoIdentityProvider.initiateAuth(params);
  }

  async getUser(id: string): Promise<any> {
    if (!id) return null;

    const params = {
      UserPoolId: this.USER_POOL_ID,
      Username: id,
    };

    return this.cognitoIdentityProvider.adminGetUser(params);
  }
}
