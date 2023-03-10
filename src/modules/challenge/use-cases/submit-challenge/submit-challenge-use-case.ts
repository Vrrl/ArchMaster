import { UseCase } from "@src/core/domain/use-case"
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository"
import { SubmissionRepository } from "@src/infra/db/repositories/submission-repository"
import { Submission } from "../../domain/submission"

interface SubmitChallengeRequest {
  userId: string
  challengeId: string
  repositoryLink: string
}

type SubmitChallengeResponse = void

export class SubmitChallengeUseCase implements UseCase<SubmitChallengeRequest, SubmitChallengeResponse> {
  constructor(
    private challengeRepository: ChallengeRepository,
    private submissionRepository: SubmissionRepository,
  ) { }

  async execute({ userId,challengeId,repositoryLink }: SubmitChallengeRequest): Promise<void> {

    const challenge = await this.challengeRepository.getById(challengeId)
    if (!challenge) throw new Error("challenge not found")

    const newSubmission = new Submission({ownerId: userId, challengeId: challengeId, repositoryLink: repositoryLink})

    await this.submissionRepository.create(newSubmission)
  }
}