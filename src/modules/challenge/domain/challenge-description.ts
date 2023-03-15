import { ValueObject } from "@src/core/domain/value-object";
import { CoreErrors } from "@src/core/errors";

import { z } from "zod";

const ChallengeDescriptionProps = z.object({
  description: z.string().min(0).max(2000),
});

type ChallengeDescriptionProps = z.infer<typeof ChallengeDescriptionProps>;

export class ChallengeDescription extends ValueObject<ChallengeDescriptionProps>{
  getValue(): string{
    return this.props.description;
  }

  public static create(props: ChallengeDescriptionProps): ChallengeDescription{
    
    const validator = ChallengeDescriptionProps.safeParse(props)

    if(!validator.success) throw new CoreErrors.InvalidPropsError(validator.error.issues[0].message)

    return new ChallengeDescription(validator.data)
  }
}