import { AggregateRoot } from "@src/core/domain/aggregate-root"
import { Tag } from "./tag"
import { Submission } from "./submission"
import { ChallengeTitle } from "./challenge-title"
import { ChallengeDescription } from "./challenge-description"

export interface ChallengeProps {
  creatorId: string
  title: ChallengeTitle
  description: ChallengeDescription
  verified: boolean
  submissions?: Submission[]
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

  get title(): ChallengeTitle{ return this.props.title}
  get description(): ChallengeDescription{ return this.props.description}
  get tags(): Tag[]{ return this.props.tags}
  get verified(): boolean{ return this.props.verified}
  get createdAt(): Date { return this.props.createdAt}
  get editedAt(): Date | undefined{ return this.props.editedAt}
  get deactivatedAt(): Date | undefined{ return this.props.deactivatedAt}
  get disabledAt(): Date | undefined{ return this.props.disabledAt}
  get creatorId(): string{ return this.props.creatorId}

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

  public static create(props: ChallengeProps, id?: string): Challenge{
    

    return new Challenge(props, id)
  }
}