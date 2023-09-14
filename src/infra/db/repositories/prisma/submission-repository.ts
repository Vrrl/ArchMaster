import { Challenge } from '@src/modules/challenge/domain/challenge';
import { ChallengeMap } from './mappers/challenge-map';
import { prisma } from '@src/infra/db/prisma/client';
import { prismaErrorHandler } from '../../prisma/errors/handler';
import { ISubmissionRepository } from '../submission-repository';
import { Submission } from '@src/modules/challenge/domain/submission';

export class SubmissionRepository implements ISubmissionRepository {
  constructor() {}

  @prismaErrorHandler
  async create(submission: Submission): Promise<void> {
    await prisma.submission.create({
      data: ChallengeMap.toPersistence(submission),
    });
  }

  @prismaErrorHandler
  async getById(id: string): Promise<Challenge | null> {
    const challenge = await prisma.challenge.findUnique({
      where: {
        id: id,
      },
    });

    if (challenge === null) return null;

    return ChallengeMap.prismaToDomain(challenge);
  }

  @prismaErrorHandler
  async update(challenge: Challenge): Promise<void> {
    await prisma.challenge.update({
      where: {
        id: challenge.id,
      },
      data: ChallengeMap.toPersistence(challenge),
    });
  }

  @prismaErrorHandler
  async list(limit?: number, index?: number): Promise<Challenge[]> {
    const res = await prisma.challenge.findMany({
      skip: index ? index : 0,
      take: limit,
    });

    return res.map(challenge => ChallengeMap.prismaToDomain(challenge));
  }
}
