import { CoreErrors } from "@core/errors"

export namespace DisableChallengeErrors {

  export class ChallengeNotFoundError extends CoreErrors.UseCaseError {
    constructor (target: string) {
      super("Couldn't find a Challenge to disable. Target: " + target)
      Object.setPrototypeOf(this, ChallengeNotFoundError.prototype);
    }
  }
  
}