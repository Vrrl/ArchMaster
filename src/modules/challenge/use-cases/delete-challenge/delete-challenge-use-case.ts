import { UseCase } from "@src/core/domain/use-case";
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository";

interface DeleteChallengeRequest {
  id: string,
  userId: string,
}

type DeleteChallengeResponse = void

export class DeleteChallengeUseCase implements UseCase<DeleteChallengeRequest, DeleteChallengeResponse>{
  constructor(
    private challengeRepository: ChallengeRepository
  ) { }

  async execute({ id, userId }: DeleteChallengeRequest): Promise<void> {

    const challenge = await this.challengeRepository.getById(id)
    if (!challenge) throw new Error("challenge not found")
    
    challenge.deactivate()
    
    await this.challengeRepository.update(challenge)

  }
}