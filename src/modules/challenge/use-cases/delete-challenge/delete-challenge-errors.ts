import { UseCaseError } from "@src/core/use-case-error";


export namespace DeleteChallengeErrors {

  export class ChallengeNotFoundError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `Challenge not found.`
      } as UseCaseError)
    }
  }
}