import { IUseCase } from '@src/core/use-case';
import { IChallengeCommandRepository } from '@src/infra/db/repositories/challenge-command-repository';
import { IChallengeQueryRepository } from '@src/infra/db/repositories/challenge-query-repository';
import * as UseCaseErrors from './delete-challenge-errors';

interface DeleteChallengeRequest {
  id: string;
  // userId: string;
}

type DeleteChallengeResponse = void;

export class DeleteChallengeUseCase implements IUseCase<DeleteChallengeRequest, DeleteChallengeResponse> {
  constructor(
    private challengeCommandRepository: IChallengeCommandRepository,
    private challengeQueryRepository: IChallengeQueryRepository,
  ) {}

  async execute({ id }: DeleteChallengeRequest): Promise<void> {
    const challenge = await this.challengeQueryRepository.getById(id);
    if (!challenge) throw new UseCaseErrors.ChallengeNotFoundError(id);

    challenge.deactivate();

    await this.challengeCommandRepository.update(challenge);
  }
}
