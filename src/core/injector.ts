import 'reflect-metadata';
import TYPES from './types';
import { Container } from 'inversify';
import { CreateChallengeUseCase } from '@modules/challenge/use-cases/create-challenge/create-challenge';

const container = new Container();

// Resources

// Repos

// UseCases
container.bind<CreateChallengeUseCase>(TYPES.CreateChallengeUseCase).to(CreateChallengeUseCase);

export default container;
