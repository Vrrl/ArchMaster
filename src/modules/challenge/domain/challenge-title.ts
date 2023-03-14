import { ValueObject } from "@src/core/domain/value-object";
import { Result } from "@src/core/either";
import { z } from "zod";

const ChallengeTitleProps = z.object({
  title: z.string().min(3).max(70),
});

type ChallengeTitleProps = z.infer<typeof ChallengeTitleProps>;

export class ChallengeTitle extends ValueObject<ChallengeTitleProps>{
  constructor(props: ChallengeTitleProps){
    super(props);
  }

  public getValue(): string{
    return this.props.title;
  }

  public static create(props: ChallengeTitleProps): Result<ChallengeTitle>{
    
    const validator = ChallengeTitleProps.safeParse(props)

    if(!validator.success) return Result.fail(validator.error.issues[0].message)

    return Result.ok<ChallengeTitle>(new ChallengeTitle(validator.data)) 
  }
}