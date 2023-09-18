import 'reflect-metadata';
import TYPES from './types';
import { Container } from 'inversify';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CreateChallengeUseCase } from '@modules/challenge/use-cases/create-challenge/create-challenge';

const container = new Container();

const dynamoDb = new DynamoDBClient({ region: process.env.REGION });

// Resources
container.bind<DynamoDBClient>(TYPES.DynamoDBClient).toConstantValue(dynamoDb);

// Repos

// UseCases
container.bind<CreateChallengeUseCase>(TYPES.CreateChallengeUseCase).to(CreateChallengeUseCase);

export default container;
