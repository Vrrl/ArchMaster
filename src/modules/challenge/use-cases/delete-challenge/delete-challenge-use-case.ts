import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository";

interface DeleteChallengeRequest {
  id: string,
  userId: string,
}

type DeleteChallengeResponse = object

export class DeleteChallengeUseCase {
  constructor(
    private ChallengeRepository: ChallengeRepository
  ) { }

  async execute({ id, userId }: DeleteChallengeRequest): Promise<DeleteChallengeResponse> {

    this.ChallengeRepository.delete()

  }
}