import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IChallengeCommandRepository } from '@src/infra/db/repositories/challenge-command-repository';
import { Challenge } from '../../domain/challenge';

interface CreateChallengeRequest {
  title: string;
  description: string;
  tags: string[];
  creatorId: string;
}

type CreateChallengeResponse = void;

@injectable()
export class CreateChallengeUseCase implements IUseCase<CreateChallengeRequest, CreateChallengeResponse> {
  constructor(
    @inject(TYPES.IChallengeCommandRepository) private readonly challengeCommandRepository: IChallengeCommandRepository,
  ) {}

  async execute({ title, description, tags, creatorId }: CreateChallengeRequest): Promise<CreateChallengeResponse> {
    const newChallenge = Challenge.createNew({ title, description, tags, creatorId });

    await this.challengeCommandRepository.save(newChallenge);
  }
}
