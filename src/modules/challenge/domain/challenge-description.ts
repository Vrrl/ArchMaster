import { ValueObject } from "@src/core/domain/value-object";
import { CoreErrors } from "@src/core/errors";

import { z } from "zod";

export class ChallengeDescription extends ValueObject<ChallengeDescriptionProps>{

  public static readonly maxlength: number = 2000
  public static readonly minlength: number = 0

  getValue(): string{
    return this.props.description;
  }

  public static create(props: ChallengeDescriptionProps): ChallengeDescription{
    
    const validator = ChallengeDescriptionProps.safeParse(props)

    if(!validator.success) throw new CoreErrors.InvalidPropsError(validator.error.issues[0].message)

    return new ChallengeDescription(validator.data)
  }
}

const ChallengeDescriptionProps: z.AnyZodObject = z.object({
  description: z.string().min(ChallengeDescription.minlength).max(ChallengeDescription.maxlength),
});

type ChallengeDescriptionProps = z.infer<typeof ChallengeDescriptionProps>;