import { CoreErrors } from "@core/errors"

export namespace RequestManualValidationErrors {

  export class ChallengeNotFoundError extends CoreErrors.UseCaseError {
    constructor (target: string) {
      super("Couldn't find the specified Challenge. Target: " + target)
      Object.setPrototypeOf(this, ChallengeNotFoundError.prototype);
    }
  }

  export class SubmissionNotFoundError extends CoreErrors.UseCaseError {
    constructor (target: string) {
      super("Couldn't find the specified Submission. Target: " + target)
      Object.setPrototypeOf(this, ChallengeNotFoundError.prototype);
    }
  }

  export class AlreadyExistAndIsPendingError extends CoreErrors.UseCaseError {
    constructor (id: string) {
      super("An manual submission request already exist and is pending: " + id)
      Object.setPrototypeOf(this, ChallengeNotFoundError.prototype);
    }
  }
  
}