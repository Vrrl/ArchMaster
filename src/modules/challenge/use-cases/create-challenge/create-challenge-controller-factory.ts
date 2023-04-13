import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { CreateChallengeController } from "./create-challenge-controller"
import { CreateChallengeUseCase } from "./create-challenge"
import { ChallengeCommandRepository } from "@src/infra/db/repositories/prisma/challenge-command-repository"

export class CreateChallengeControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeCommandRepository = new ChallengeCommandRepository(prisma)
        const usecase = new CreateChallengeUseCase(challengeCommandRepository)
        return new CreateChallengeController(usecase)
    }
}