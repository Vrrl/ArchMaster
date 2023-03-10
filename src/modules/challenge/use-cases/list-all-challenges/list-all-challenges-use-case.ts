import { UseCase } from "@src/core/domain/use-case"
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository"

interface ListAllChallengesRequest{
  index?: number
  limit?: number
}

type ListAllChallengesResponse = object[]

export class ListAllChallengesUseCase implements UseCase<ListAllChallengesRequest,ListAllChallengesResponse>{
  constructor(
    private challengeRepository: ChallengeRepository

  ){}

  async execute({index, limit}: ListAllChallengesRequest): Promise<ListAllChallengesResponse> {
    const challenges = await this.challengeRepository.list(index, limit);

    return challenges
  }
}