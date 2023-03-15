import { IUseCase } from "@src/core/use-case";
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository";
import { DeleteChallengeErrors } from "./delete-challenge-errors";

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
    if (!challenge) throw new DeleteChallengeErrors.ChallengeNotFoundError(id)
    
    challenge.deactivate()
    
    await this.challengeRepository.update(challenge)

  }
}