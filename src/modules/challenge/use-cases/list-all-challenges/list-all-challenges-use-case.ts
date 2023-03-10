import { IUseCase } from "@src/core/domain/use-case"
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository"

interface ListAllChallengesRequest{
  index?: number
  limit?: number
}

type ListAllChallengesResponse = object[]

export class ListAllChallengesUseCase implements IUseCase<ListAllChallengesRequest,ListAllChallengesResponse>{
  constructor(
    private challengeRepository: IChallengeRepository

  ){}

  async execute({index, limit}: ListAllChallengesRequest): Promise<ListAllChallengesResponse> {
    const challenges = await this.challengeRepository.list(index, limit);

    return challenges
  }
}