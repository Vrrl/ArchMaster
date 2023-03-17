import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { ChallengeRepository } from "@src/infra/db/repositories/prisma/challenge-repository"
import { EditChallengeUseCase } from "./edit-challenge"
import { EditChallengeController } from "./edit-challenge-controller"

export class EditChallengeControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeRepository = new ChallengeRepository(prisma)
        const usecase = new EditChallengeUseCase(challengeRepository)
        return new EditChallengeController(usecase)
    }
}