import { Controller, ControllerFactory } from '@core/infra/controller';
import { prisma } from '@src/infra/db/prisma/client';
import { ChallengeCommandRepository } from '@src/infra/db/repositories/prisma/challenge-command-repository';
import { ChallengeQueryRepository } from '@src/infra/db/repositories/prisma/challenge-query-repository';
import { DeleteChallengeUseCase } from './delete-challenge';
import { DeleteChallengeController } from './delete-challenge-controller';

export class DeleteChallengeControllerFactory extends ControllerFactory {
  makeController(): Controller {
    const challengeCommandRepository = new ChallengeCommandRepository(prisma);
    const challengeQueryRepository = new ChallengeQueryRepository(prisma);
    const usecase = new DeleteChallengeUseCase(challengeCommandRepository, challengeQueryRepository);
    return new DeleteChallengeController(usecase);
  }
}
