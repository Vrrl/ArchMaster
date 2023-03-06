import { ValueObject } from "@src/core/domain/value-object";
import { z } from "zod";

const ChallengeTitleProps = z.object({
  title: z.string().min(3).max(70),
});

type ChallengeTitleProps = z.infer<typeof ChallengeTitleProps>;

export class ChallengeTitle extends ValueObject<ChallengeTitleProps>{
  constructor(props: ChallengeTitleProps){
    super(ChallengeTitleProps.parse(props));
  }

}