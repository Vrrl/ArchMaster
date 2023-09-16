import { ValueObject } from '@src/core/domain/value-object';
import * as CoreErrors from '@src/core/errors';
import { z } from 'zod';

const ChallengeTitleProps = z.object({
  title: z.string().min(3).max(70),
});

type ChallengeTitleProps = z.infer<typeof ChallengeTitleProps>;

export class ChallengeTitle extends ValueObject<ChallengeTitleProps> {
  constructor(props: ChallengeTitleProps) {
    super(props);
  }

  public getValue(): string {
    return this.props.title;
  }

  public static create(props: ChallengeTitleProps): ChallengeTitle {
    const validator = ChallengeTitleProps.safeParse(props);

    if (!validator.success) throw new CoreErrors.InvalidPropsError(validator.error.issues[0].message);

    return new ChallengeTitle(validator.data);
  }
}
