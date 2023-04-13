import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { ChallengeCommandRepository } from "@src/infra/db/repositories/prisma/challenge-command-repository"
import { ChallengeQueryRepository } from "@src/infra/db/repositories/prisma/challenge-query-repository"
import { DisableChallengeUseCase } from "./disable-challenge"
import { DisableChallengeController } from "./disable-challenge-controller"

export class DisableChallengeControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeCommandRepository = new ChallengeCommandRepository(prisma)
        const challengeQueryRepository = new ChallengeQueryRepository(prisma)
        const usecase = new DisableChallengeUseCase(challengeCommandRepository, challengeQueryRepository)
        return new DisableChallengeController(usecase)
    }
}