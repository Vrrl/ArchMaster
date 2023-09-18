const TYPES = {
  // Resources
  DynamoDBClient: Symbol.for('DynamoDBClient'),
  // Repos
  IChallengeCommandRepository: Symbol.for('IChallengeCommandRepository'),
  // UseCases
  CreateChallengeUseCase: Symbol.for('CreateChallengeUseCase'),
};

export default TYPES;
