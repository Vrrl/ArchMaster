import * as CoreErrors from '@core/errors';

export class ChallengeNotFoundError extends CoreErrors.UseCaseError {
  constructor(target: string) {
    super("Couldn't find a Challenge to delete. Target: " + target);
    Object.setPrototypeOf(this, ChallengeNotFoundError.prototype);
  }
}
