import { v4 as uuid } from 'uuid';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

/**
 * @desc
 * Entitys are a representation of an object in the domain.
 * It is defined by its identity, rather than its attributes.
 * It encapsulates the state of that object through its attributes,
 * including the aggregation of other entities, and it defines any operations that
 * might be performed on the entity.
 */

export abstract class Entity<T> {
  protected readonly _id: string;
  public readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : uuid();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {
    // TODO: made tests
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id == object._id;
  }
}
