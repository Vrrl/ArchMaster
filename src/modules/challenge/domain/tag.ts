import { ValueObject } from "@src/core/domain/value-object";
import { CoreErrors } from "@src/core/errors";

import { z } from "zod";

const TagProps = z.object({
  name: z.string().min(1).max(50),
});

type TagProps = z.infer<typeof TagProps>;


export class Tag extends ValueObject<TagProps>{
  get name(): string{
    return this.props.name
  }

  public static create(props: TagProps): Tag{
    
    const validator = TagProps.safeParse(props)

    if(!validator.success) throw new CoreErrors.InvalidPropsError(validator.error.issues[0].message)

    return new Tag(validator.data)
  }
}