import { UseCase } from "@src/core/domain/use-case";
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository";
import { Challenge } from "../../domain/challenge";

interface DisableChallengeRequest {
  id: string,
  userId: string,
}

type DisableChallengeResponse = object

export class DisableChallengeUseCase implements UseCase<DisableChallengeRequest,DisableChallengeResponse> {
  constructor(
    private challengeRepository: ChallengeRepository
  ) { }

  async execute({ id, userId }: DisableChallengeRequest): Promise<void> {

    const challenge = await this.challengeRepository.getById(id)
    if (!challenge)
    throw new Error("challenge not found")
    
    challenge.disable()

    this.challengeRepository.update(challenge)
    
  }
}