import { ValueObject } from "@src/core/domain/value-object";
import { Result } from "@src/core/either";

import { z } from "zod";

const ChallengeDescriptionProps = z.object({
  description: z.string().min(0).max(2000),
});

type ChallengeDescriptionProps = z.infer<typeof ChallengeDescriptionProps>;

export class ChallengeDescription extends ValueObject<ChallengeDescriptionProps>{
  getValue(): string{
    return this.props.description;
  }

  public static create(props: ChallengeDescriptionProps): Result<ChallengeDescription>{
    
    const validator = ChallengeDescriptionProps.safeParse(props)

    if(!validator.success) return Result.fail(validator.error.issues[0].message)

    return Result.ok<ChallengeDescription>(new ChallengeDescription(validator.data)) 
  }
}