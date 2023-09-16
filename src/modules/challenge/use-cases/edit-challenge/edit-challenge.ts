// import * as CoreErrors from '@src/core/errors';
import { IUseCase } from '@src/core/use-case';
import { IChallengeCommandRepository } from '@src/infra/db/repositories/challenge-command-repository';
import { IChallengeQueryRepository } from '@src/infra/db/repositories/challenge-query-repository';
import { ChallengeDescription } from '../../domain/challenge-description';
import { ChallengeTitle } from '../../domain/challenge-title';
import { Tag } from '../../domain/tag';
import * as UseCaseErrors from './edit-challenge-errors';

interface EditChallengeRequest {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

type EditChallengeResponse = void;

export class EditChallengeUseCase implements IUseCase<EditChallengeRequest, EditChallengeResponse> {
  constructor(
    private challengeCommandRepository: IChallengeCommandRepository,
    private challengeQueryRepository: IChallengeQueryRepository,
  ) {}

  async execute({ id, title, description, tags }: EditChallengeRequest): Promise<EditChallengeResponse> {
    const challenge = await this.challengeQueryRepository.getById(id);
    if (!challenge) throw new UseCaseErrors.ChallengeNotFoundError(id);

    const cTitle = ChallengeTitle.create({ title });
    const cDescription = ChallengeDescription.create({ description });
    const cTags = tags.map(tag => Tag.create({ name: tag }));

    challenge.editInformations(cTitle, cDescription, cTags);

    await this.challengeCommandRepository.update(challenge);
  }
}
