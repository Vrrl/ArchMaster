import { UseCase } from "@src/core/domain/use-case"
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository"
import { Challenge } from "../../domain/challenge"
import { ChallengeDescription } from "../../domain/challenge-description"
import { ChallengeTitle } from "../../domain/challenge-title"
import { Tag } from "../../domain/tag"

interface CreateChallengeRequest{
  title: string
  description: string
  tags: string[]
  creatorId: string
}

type CreateChallengeResponse = object

export class CreateChallengeUseCase implements UseCase<CreateChallengeRequest, CreateChallengeResponse>{
  constructor(
    private ChallengeRepository: ChallengeRepository
  ){}

  async execute({title,description,tags,creatorId}: CreateChallengeRequest): Promise<CreateChallengeResponse> {

    const titleOrError = new ChallengeTitle({title})
    const descriptionOrError = new ChallengeDescription({description})
    let tagsOrError: Tag[] = []
    tags.forEach(tag => {tagsOrError.push(new Tag({name: tag}))})

    const challenge = new Challenge({
      title: titleOrError,
      description: descriptionOrError,
      tags: tagsOrError,
      creatorId: creatorId,
      verified: false,
      createdAt: new Date(),
    })

    this.ChallengeRepository.create(challenge)

    return challenge
  }
}