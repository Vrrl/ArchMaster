import { AggregateRoot } from "@src/core/domain/aggregate-root"
import { Tag } from "./tag"
import { ChallengeSubmission } from "./submission"
import { ChallengeTitle } from "./challenge-title"
import { ChallengeDescription } from "./challenge-description"

export interface ChallengeProps {
  creatorId: string
  title: ChallengeTitle
  description: ChallengeDescription
  verified: boolean
  submissions?: ChallengeSubmission[]
  tags: Tag[]
  createdAt: Date
  editedAt?: Date
  deactivatedAt?: Date
  disabledAt?: Date
} 

export class Challenge extends AggregateRoot<ChallengeProps>{

  editInformations(title: ChallengeTitle, description: ChallengeDescription, tags: Tag[]): void{
    // add domain event
    this.props.title = title
    this.props.description = description
    this.props.tags = tags
    this.props.editedAt = new Date()
  }

  disable(): void {
    this.props.disabledAt = new Date()
  }

  enable(): void {
    this.props.disabledAt = undefined
  }

  deactivate(): void {
    this.props.deactivatedAt = new Date()
  }

  activate(): void {
    this.props.deactivatedAt = undefined
  }
}