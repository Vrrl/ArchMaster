import { Entity } from "@src/core/domain/entity"

export interface ChallengeSubmissionProps {
  ownerId: string
  repository_link: string
}

export class ChallengeSubmission extends Entity<ChallengeSubmission>{
  
}