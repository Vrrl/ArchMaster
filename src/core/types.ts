const TYPES = {
  // Resources
  PrismaClient: Symbol.for('PrismaClient'),
  // Repos
  IChallengeCommandRepository: Symbol.for('IChallengeCommandRepository'),
  // UseCases
  CreateChallengeUseCase: Symbol.for('CreateChallengeUseCase'),
};

export default TYPES;
