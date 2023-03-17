import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { ChallengeRepository } from "@src/infra/db/repositories/prisma/challenge-repository"
import { CreateChallengeController } from "./create-challenge-controller"
import { CreateChallengeUseCase } from "./create-challenge"

export class CreateChallengeControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeRepository = new ChallengeRepository(prisma)
        const usecase = new CreateChallengeUseCase(challengeRepository)
        return new CreateChallengeController(usecase)
    }
}