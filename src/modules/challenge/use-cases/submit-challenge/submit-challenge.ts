import { IUseCase } from "@src/core/use-case"
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-query-repository"
import { ISubmissionRepository } from "@src/infra/db/repositories/submission-repository"
import { Submission } from "../../domain/submission"
import { SubmitChallengeErrors } from "./submit-challenge-errors"

interface SubmitChallengeRequest {
  userId: string
  challengeId: string
  repositoryLink: string
}

type SubmitChallengeResponse = void

export class SubmitChallengeUseCase implements IUseCase<SubmitChallengeRequest, SubmitChallengeResponse> {
  constructor(
    private challengeRepository: IChallengeRepository,
    private submissionRepository: ISubmissionRepository,
  ) { }

  async execute({ userId,challengeId,repositoryLink }: SubmitChallengeRequest): Promise<SubmitChallengeResponse> {

    const challenge = await this.challengeRepository.getById(challengeId)
    if (!challenge) throw new SubmitChallengeErrors.ChallengeNotFoundError(challengeId)

    const newSubmission = new Submission({ownerId: userId, challengeId: challengeId, repositoryLink: repositoryLink})

    await this.submissionRepository.create(newSubmission)
  }
}