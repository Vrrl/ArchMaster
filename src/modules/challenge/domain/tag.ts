import { ValueObject } from "@src/core/domain/value-object";
import { Result } from "@src/core/either";

import { z } from "zod";

const TagProps = z.object({
  name: z.string().min(1).max(50),
});

type TagProps = z.infer<typeof TagProps>;


export class Tag extends ValueObject<TagProps>{
  get name(): string{
    return this.props.name
  }

  public static create(props: TagProps): Result<Tag>{
    
    const validator = TagProps.safeParse(props)

    if(!validator.success) return Result.fail(validator.error.issues[0].message)

    return Result.ok<Tag>(new Tag(validator.data)) 
  }
}