import { ValueObject } from "@src/core/domain/value-object";


export interface TagProps{
  name: string;
}

export class Tag extends ValueObject<TagProps>{
  get name(): string{
    return this.props.name
  }
}