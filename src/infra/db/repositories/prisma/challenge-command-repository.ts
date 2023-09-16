import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { Challenge } from '@src/modules/challenge/domain/challenge';
import { ChallengeMap } from './mappers/challenge-map';
import { prismaErrorHandler } from '../../prisma/errors/handler';
import { PrismaClient } from '@prisma/client';
import { IChallengeCommandRepository } from '../challenge-command-repository';
@injectable()
export class ChallengeCommandRepository implements IChallengeCommandRepository {
  constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

  hardDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  @prismaErrorHandler
  async save(challenge: Challenge): Promise<void> {
    await this.prisma.challenge.create({
      data: ChallengeMap.toPersistence(challenge),
    });
  }

  @prismaErrorHandler
  async update(challenge: Challenge): Promise<void> {
    const res = await this.prisma.challenge.update({
      where: {
        id: challenge.id,
      },
      data: ChallengeMap.toPersistence(challenge),
    });
  }
}
