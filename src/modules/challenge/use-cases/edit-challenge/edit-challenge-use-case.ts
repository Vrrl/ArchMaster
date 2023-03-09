import { UseCase } from "@src/core/domain/use-case"
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository"

interface EditChallengeRequest {
  name: string
}

type EditChallengeResponse = object

export class EditChallengeUseCase implements UseCase<EditChallengeRequest, EditChallengeResponse> {
  constructor(
    private challengeRepository: ChallengeRepository
  ) { }

  async execute({ name }: EditChallengeRequest): Promise<EditChallengeResponse> {

  }
}