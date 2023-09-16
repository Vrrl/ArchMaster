import 'reflect-metadata';
import TYPES from './types';
import { Container } from 'inversify';
import { CreateChallengeUseCase } from '@modules/challenge/use-cases/create-challenge/create-challenge';
import { IChallengeCommandRepository } from '@infra/db/repositories/challenge-command-repository';
import { ChallengeCommandRepository } from '@infra/db/repositories/prisma/challenge-command-repository';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@src/infra/db/prisma/client';

const container = new Container();

// Resources
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);

// Repos
container.bind<IChallengeCommandRepository>(TYPES.IChallengeCommandRepository).to(ChallengeCommandRepository);

// UseCases
container.bind<CreateChallengeUseCase>(TYPES.CreateChallengeUseCase).to(CreateChallengeUseCase);

export default container;
