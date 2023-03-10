import { Entity } from "@src/core/domain/entity"
import { SubmissionAvaliation } from "./avaliation"

export interface SubmissionProps {
  ownerId: string
  challengeId: string
  repositoryLink: string
  avaliations?: SubmissionAvaliation[]
}

export class Submission extends Entity<SubmissionProps>{
  

  requestNewManualValidation(): void{
    // TODO: MAKE DOMAIN EVENT
    this.
  }
}