import { IUseCase } from "@src/core/domain/use-case";
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository";

interface DeleteChallengeRequest {
  id: string,
  userId: string,
}

type DeleteChallengeResponse = void

export class DeleteChallengeUseCase implements IUseCase<DeleteChallengeRequest, DeleteChallengeResponse>{
  constructor(
    private challengeRepository: IChallengeRepository
  ) { }

  async execute({ id, userId }: DeleteChallengeRequest): Promise<void> {

    const challenge = await this.challengeRepository.getById(id)
    if (!challenge) throw new Error("challenge not found")
    
    challenge.deactivate()
    
    await this.challengeRepository.update(challenge)

  }
}