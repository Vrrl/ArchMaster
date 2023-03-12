import { ValueObject } from "@src/core/domain/value-object";


export interface ChallengeDescriptionProps{
  description: string;
}

export class ChallengeDescription extends ValueObject<ChallengeDescriptionProps>{
  getValue(): string{
    return this.props.description;
  }
}