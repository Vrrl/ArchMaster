import { UseCase } from "@src/core/domain/use-case"
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository"
import { ChallengeDescription } from "../../domain/challenge-description"
import { ChallengeTitle } from "../../domain/challenge-title"
import { Tag } from "../../domain/tag"

interface EditChallengeRequest {
  id: string
  title: string
  description: string
  tags: string[]
}

type EditChallengeResponse = void

export class EditChallengeUseCase implements UseCase<EditChallengeRequest, EditChallengeResponse> {
  constructor(
    private challengeRepository: ChallengeRepository
  ) { }

  async execute({ id,title,description,tags }: EditChallengeRequest): Promise<void> {
    const challenge = await this.challengeRepository.getById(id)
    if (!challenge) throw new Error("challenge not found")
    
    const titleOrError = new ChallengeTitle({title})
    const descriptionOrError = new ChallengeDescription({description})
    const tagsOrError = tags.map((tag) => new Tag({name: tag}))

    challenge.editInformations(titleOrError,descriptionOrError,tagsOrError)
    
    await this.challengeRepository.update(challenge)
  }
}