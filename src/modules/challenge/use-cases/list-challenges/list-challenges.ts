import { IUseCase } from "@src/core/use-case"
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository"
import { Challenge } from "../../domain/challenge"

interface ListChallengesRequest{
  index?: number
  limit?: number
}

type ListChallengesResponse = Challenge[]

export class ListChallengesUseCase implements IUseCase<ListChallengesRequest,ListChallengesResponse>{
  constructor(
    private challengeRepository: IChallengeRepository

  ){}

  async execute({index, limit}: ListChallengesRequest): Promise<ListChallengesResponse> {
    const challenges = await this.challengeRepository.list(index, limit);

    return challenges
  }
}