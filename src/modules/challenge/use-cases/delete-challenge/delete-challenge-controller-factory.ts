import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { ChallengeRepository } from "@src/infra/db/repositories/prisma/challenge-repository"
import { DeleteChallengeUseCase } from "./delete-challenge"
import { DeleteChallengeController } from "./delete-challenge-controller"

export class DeleteChallengeControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeRepository = new ChallengeRepository(prisma)
        const usecase = new DeleteChallengeUseCase(challengeRepository)
        return new DeleteChallengeController(usecase)
    }
}