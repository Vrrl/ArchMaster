const TYPES = {
  // Resources
  DynamoDBClient: Symbol.for('DynamoDBClient'),
  CognitoIdentityProvider: Symbol.for('CognitoIdentityProvider'),
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  // Repos
  IChallengeCommandRepository: Symbol.for('IChallengeCommandRepository'),
  // UseCases
  SignUpUseCase: Symbol.for('SignUpUseCase'),
  SignUpConfirmUseCase: Symbol.for('SignUpConfirmUseCase'),
  SignUpResendVerificationCodeUseCase: Symbol.for('SignUpResendVerificationCodeUseCase'),
  LogInUseCase: Symbol.for('LogInUseCase'),
  CreateChallengeUseCase: Symbol.for('CreateChallengeUseCase'),
};

export default TYPES;
