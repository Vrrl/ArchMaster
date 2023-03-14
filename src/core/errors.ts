import { UseCaseError } from "@src/core/use-case-error";

export namespace GenericErrors {

  export class InvalidPropsError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `InvalidPropsError`
      } as UseCaseError)
    }
  }
}