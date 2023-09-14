import { Controller, ControllerFactory } from '@core/infra/controller';
import { prisma } from '@src/infra/db/prisma/client';
import { ChallengeCommandRepository } from '@src/infra/db/repositories/prisma/challenge-command-repository';
import { ChallengeQueryRepository } from '@src/infra/db/repositories/prisma/challenge-query-repository';
import { EditChallengeUseCase } from './edit-challenge';
import { EditChallengeController } from './edit-challenge-controller';

export class EditChallengeControllerFactory extends ControllerFactory {
  makeController(): Controller {
    const challengeCommandRepository = new ChallengeCommandRepository(prisma);
    const challengeQueryRepository = new ChallengeQueryRepository(prisma);
    const usecase = new EditChallengeUseCase(challengeCommandRepository, challengeQueryRepository);
    return new EditChallengeController(usecase);
  }
}
