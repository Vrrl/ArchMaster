import { Controller, ControllerFactory } from "@core/infra/controller"
import { prisma } from "@src/infra/db/prisma/client"
import { ListChallengesController } from "./list-challenges-controller"
import { ListChallengesUseCase } from "./list-challenges"
import { ChallengeQueryRepository } from "@src/infra/db/repositories/prisma/challenge-query-repository"

export class ListChallengesControllerFactory extends ControllerFactory{  
    makeController(): Controller {
        const challengeRepository = new ChallengeQueryRepository(prisma)
        const usecase = new ListChallengesUseCase(challengeRepository)
        return new ListChallengesController(usecase)
    }
}