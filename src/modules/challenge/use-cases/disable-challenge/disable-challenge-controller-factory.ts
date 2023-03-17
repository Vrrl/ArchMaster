import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { ChallengeRepository } from "@src/infra/db/repositories/prisma/challenge-repository"
import { DisableChallengeUseCase } from "./disable-challenge"
import { DisableChallengeController } from "./disable-challenge-controller"

export class DisableChallengeControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeRepository = new ChallengeRepository(prisma)
        const usecase = new DisableChallengeUseCase(challengeRepository)
        return new DisableChallengeController(usecase)
    }
}