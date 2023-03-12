import { Controller, ControllerFactory } from "@core/infra/controller"
import { ChallengeRepository } from "@src/infra/db/repositories/prisma/challenge-repository"
import { CreateChallengeController } from "./create-challenge-controller"
import { CreateChallengeUseCase } from "./create-challenge-use-case"

export class CreateChallengeControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeRepository = new ChallengeRepository()
        const usecase = new CreateChallengeUseCase(challengeRepository)
        return new CreateChallengeController(usecase)
    }
}