import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IChallengeCommandRepository } from '@src/infra/db/repositories/challenge-command-repository';
import { Challenge } from '../../domain/challenge';
import { ChallengeDescription } from '../../domain/challenge-description';
import { ChallengeTitle } from '../../domain/challenge-title';
import { Tag } from '../../domain/tag';

interface CreateChallengeRequest {
  title: string;
  description: string;
  tags: string[];
}

type CreateChallengeResponse = void;

@injectable()
export class CreateChallengeUseCase implements IUseCase<CreateChallengeRequest, CreateChallengeResponse> {
  constructor(
    @inject(TYPES.IChallengeCommandRepository) private readonly challengeCommandRepository: IChallengeCommandRepository,
  ) {}

  async execute({ title, description, tags }: CreateChallengeRequest): Promise<CreateChallengeResponse> {
    const cTitle = ChallengeTitle.create({ title });
    const cDescription = ChallengeDescription.create({ description });
    const cTags = tags.map(tag => Tag.create({ name: tag }));

    const newChallenge = new Challenge({
      title: cTitle,
      description: cDescription,
      tags: cTags,
      creatorId: 'creatorId',
      verified: false,
      createdAt: new Date(),
    });

    await this.challengeCommandRepository.save(newChallenge);
  }
}
