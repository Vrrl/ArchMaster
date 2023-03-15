export namespace CoreErrors {

  export class InvalidPropsError extends Error {
    constructor (message: string) {
      super(message)
      Object.setPrototypeOf(this, InvalidPropsError.prototype);
    }
  }

  export class UseCaseError extends Error {
    constructor (message: string) {
      super(message)
      Object.setPrototypeOf(this, InvalidPropsError.prototype);
    }
  }

}