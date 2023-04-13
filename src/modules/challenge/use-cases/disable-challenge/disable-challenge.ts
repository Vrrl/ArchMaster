import { IUseCase } from "@src/core/use-case";
import { IChallengeCommandRepository } from "@src/infra/db/repositories/challenge-command-repository";
import { IChallengeQueryRepository } from "@src/infra/db/repositories/challenge-query-repository";
import { Challenge } from "../../domain/challenge";
import { DisableChallengeErrors } from "./disable-challenge-errors";

interface DisableChallengeRequest {
  id: string,
  userId: string,
}

type DisableChallengeResponse = void

export class DisableChallengeUseCase implements IUseCase<DisableChallengeRequest,DisableChallengeResponse> {
  constructor(
    private challengeCommandRepository: IChallengeCommandRepository,
    private challengeQueryRepository: IChallengeQueryRepository
  ) { }

  async execute({ id, userId }: DisableChallengeRequest): Promise<void> {

    const challenge = await this.challengeQueryRepository.getById(id)
    if (!challenge) throw new DisableChallengeErrors.ChallengeNotFoundError(id)
    
    challenge.disable()
    
    await this.challengeCommandRepository.update(challenge)
    
  }
}