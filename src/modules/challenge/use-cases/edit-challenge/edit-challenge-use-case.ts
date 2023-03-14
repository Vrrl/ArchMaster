import { Either, Result } from "@src/core/either"
import { GenericErrors } from "@src/core/errors"
import { IUseCase } from "@src/core/use-case"
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository"
import { ChallengeDescription } from "../../domain/challenge-description"
import { ChallengeTitle } from "../../domain/challenge-title"
import { Tag } from "../../domain/tag"

interface EditChallengeRequest {
  id: string
  title: string
  description: string
  tags: string[]
}

type EditChallengeResponse = Result<void>

export class EditChallengeUseCase implements IUseCase<EditChallengeRequest, EditChallengeResponse> {
  constructor(
    private challengeRepository: IChallengeRepository
  ) { }

  async execute({ id,title,description,tags }: EditChallengeRequest): Promise<EditChallengeResponse> {
    const challenge = await this.challengeRepository.getById(id)
    if (!challenge) throw new Error("challenge not found")
    
    const titleOrError: Result<ChallengeTitle> = ChallengeTitle.create({title})
    const descriptionOrError: Result<ChallengeDescription> = ChallengeDescription.create({description})
    const tagsOrError: Result<Tag>[] = tags.map((tag) => Tag.create({name: tag}))

    const propsResult: Result<any> = Result.combine([titleOrError, descriptionOrError, Result.combine(tagsOrError)])

    if (propsResult.isFailure) return Result.fail(propsResult.getErrorValue())

    challenge.editInformations(titleOrError.getValue(),descriptionOrError.getValue(),tagsOrError.map(r => r.getValue()))
    
    await this.challengeRepository.update(challenge)

    return Result.ok()
  }
}