import 'reflect-metadata';
import TYPES from './types';
import { Container } from 'inversify';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CreateChallengeUseCase } from '@modules/challenge/use-cases/create-challenge/create-challenge';
import { ChallengeCommandRepository } from '@src/infra/db/repositories/dynamo/challenge-command-repository';
import { IChallengeCommandRepository } from '@src/infra/db/repositories/challenge-command-repository';

const container = new Container();

const dynamoDb = new DynamoDBClient({ region: process.env.REGION });

// Resources
container.bind<DynamoDBClient>(TYPES.DynamoDBClient).toConstantValue(dynamoDb);

// Repos
container.bind<IChallengeCommandRepository>(TYPES.IChallengeCommandRepository).to(ChallengeCommandRepository);

// UseCases
container.bind<CreateChallengeUseCase>(TYPES.CreateChallengeUseCase).to(CreateChallengeUseCase);

export default container;
