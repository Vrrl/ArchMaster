import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { ChallengeRepository } from "@src/infra/db/repositories/prisma/challenge-repository"
import { ListChallengesController } from "./list-challenges-controller"
import { ListChallengesUseCase } from "./list-challenges"

export class ListChallengesControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeRepository = new ChallengeRepository(prisma)
        const usecase = new ListChallengesUseCase(challengeRepository)
        return new ListChallengesController(usecase)
    }
}