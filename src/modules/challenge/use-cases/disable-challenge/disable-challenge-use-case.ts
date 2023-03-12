import { IUseCase } from "@src/core/use-case";
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository";
import { Challenge } from "../../domain/challenge";

interface DisableChallengeRequest {
  id: string,
  userId: string,
}

type DisableChallengeResponse = void

export class DisableChallengeUseCase implements IUseCase<DisableChallengeRequest,DisableChallengeResponse> {
  constructor(
    private challengeRepository: IChallengeRepository
  ) { }

  async execute({ id, userId }: DisableChallengeRequest): Promise<void> {

    const challenge = await this.challengeRepository.getById(id)
    if (!challenge) throw new Error("challenge not found")
    
    challenge.disable()
    
    await this.challengeRepository.update(challenge)
    
  }
}