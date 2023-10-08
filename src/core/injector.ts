import 'reflect-metadata';
import TYPES from './types';
import { Container } from 'inversify';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { CreateChallengeUseCase } from '@modules/challenge/use-cases/create-challenge/create-challenge';
import { ChallengeCommandRepository } from '@src/infra/db/repositories/dynamo/challenge-command-repository';
import { IChallengeCommandRepository } from '@src/infra/db/repositories/challenge-command-repository';
import { IAuthenticationService } from '@src/infra/authentication/services/authentication-service';
import { CognitoService } from '@src/infra/authentication/services/cognito/cognito-service';
import { SignUpUseCase } from '@src/modules/authentication/use-cases/sign-up/sign-up';
import { SignUpConfirmUseCase } from '@src/modules/authentication/use-cases/sign-up-confirm/sign-up-confirm';
import { SignUpResendVerificationCodeUseCase } from '@src/modules/authentication/use-cases/sign-up-resend-verification-code/sign-up-resend-verification-code';

const container = new Container();

const dynamoDb = new DynamoDBClient({ region: process.env.REGION });
const cognitoIdentityProvider = new CognitoIdentityProvider({ region: process.env.REGION });

// Resources
container.bind<DynamoDBClient>(TYPES.DynamoDBClient).toConstantValue(dynamoDb);
container.bind<CognitoIdentityProvider>(TYPES.CognitoIdentityProvider).toConstantValue(cognitoIdentityProvider);

// Services
container.bind<IAuthenticationService>(TYPES.IAuthenticationService).to(CognitoService);

// Repos
container.bind<IChallengeCommandRepository>(TYPES.IChallengeCommandRepository).to(ChallengeCommandRepository);

// UseCases
container.bind<SignUpUseCase>(TYPES.SignUpUseCase).to(SignUpUseCase);
container.bind<SignUpConfirmUseCase>(TYPES.SignUpConfirmUseCase).to(SignUpConfirmUseCase);
container
  .bind<SignUpResendVerificationCodeUseCase>(TYPES.SignUpResendVerificationCodeUseCase)
  .to(SignUpResendVerificationCodeUseCase);

container.bind<CreateChallengeUseCase>(TYPES.CreateChallengeUseCase).to(CreateChallengeUseCase);

export default container;
