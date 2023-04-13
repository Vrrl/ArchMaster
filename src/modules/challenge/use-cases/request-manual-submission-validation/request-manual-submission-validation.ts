import { IUseCase } from "@src/core/use-case"
import { IAvaliationRepository } from "@src/infra/db/repositories/avaliation-repository"
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-query-repository"
import { ISubmissionRepository } from "@src/infra/db/repositories/submission-repository"
import { Avaliation } from "../../domain/avaliation"
import { AvaliationTypes } from "../../domain/avaliation-types"
import { RequestManualValidationErrors } from "./request-manual-submission-validation-errors"

interface RequestSubmissionManualValidationRequest {
  id: string
  userId: string
  submissionId: string
}

type RequestSubmissionManualValidationResponse = void

export class RequestSubmissionManualValidationUseCase implements IUseCase<RequestSubmissionManualValidationRequest,RequestSubmissionManualValidationResponse> {
  constructor(
    private challengeRepository: IChallengeRepository,
    private submissionRepository: ISubmissionRepository,
    private avaliationRepository: IAvaliationRepository
  ) { }

  async execute({ id,userId,submissionId }: RequestSubmissionManualValidationRequest): Promise<RequestSubmissionManualValidationResponse> {
    const challenge = await this.challengeRepository.getById(id)
    if (!challenge) throw new RequestManualValidationErrors.ChallengeNotFoundError(id)

    const submission = await this.submissionRepository.getById(submissionId)
    if (!submission) throw new RequestManualValidationErrors.SubmissionNotFoundError(submissionId)
    
    const exists = await this.avaliationRepository.list(undefined, undefined, submission.id, AvaliationTypes.MANUAL)
    if(exists) throw new RequestManualValidationErrors.AlreadyExistAndIsPendingError(exists[0].id)

    const newAvaliation = new Avaliation({submissionId: submission.id, type: AvaliationTypes.MANUAL})

    await this.avaliationRepository.create(newAvaliation)
  }
}