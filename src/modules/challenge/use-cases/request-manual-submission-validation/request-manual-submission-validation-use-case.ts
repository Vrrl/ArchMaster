import { UseCase } from "@src/core/domain/use-case"
import { AvaliationRepository } from "@src/infra/db/repositories/avaliation-repository"
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository"
import { SubmissionRepository } from "@src/infra/db/repositories/submission-repository"
import { Avaliation } from "../../domain/avaliation"
import { AvaliationTypes } from "../../domain/avaliation-types"

interface RequestSubmissionManualValidationRequest {
  id: string
  userId: string
  submissionId: string
}

type RequestSubmissionManualValidationResponse = void

export class RequestSubmissionManualValidationUseCase implements UseCase<RequestSubmissionManualValidationRequest,RequestSubmissionManualValidationResponse> {
  constructor(
    private challengeRepository: ChallengeRepository,
    private submissionRepository: SubmissionRepository,
    private avaliationRepository: AvaliationRepository
  ) { }

  async execute({ id,userId,submissionId }: RequestSubmissionManualValidationRequest): Promise<void> {
    const challenge = await this.challengeRepository.getById(id)
    if (!challenge) throw new Error("challenge not found")

    const submission = await this.submissionRepository.getById(submissionId)
    if (!submission) throw new Error("submission not found")
    
    if(await this.avaliationRepository.list(undefined, undefined, submission.id, AvaliationTypes.MANUAL))
      throw new Error("Already have an manual submission request pending")

    const newAvaliation = new Avaliation({submissionId: submission.id, type: AvaliationTypes.MANUAL})

    await this.avaliationRepository.create(newAvaliation)
  }
}