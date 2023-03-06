import { UseCase } from "@src/core/domain/use-case"

interface CloseChallengeRequest{
  id: string
}

type CloseChallengeResponse = object[]

export class CloseChallengeUseCase implements UseCase<>{
  constructor(

  ){}

  async execute({id}: CloseChallengeRequest): Promise<CloseChallengeResponse> {
    
  }
}