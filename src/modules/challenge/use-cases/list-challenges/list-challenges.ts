import { IUseCase } from '@src/core/use-case';
import { IChallengeQueryRepository } from '@src/infra/db/repositories/challenge-query-repository';
// import { Challenge } from '../../domain/challenge';

interface ListChallengesRequest {
  index?: number;
  limit?: number;
}

export type ListChallengesResponse = {
  id: string;
  title: string;
  tags: string[];
  verified: boolean;
  creator: {
    name: string | null;
  };
}[];

export class ListChallengesUseCase implements IUseCase<ListChallengesRequest, ListChallengesResponse> {
  constructor(private challengeQueryRepository: IChallengeQueryRepository) {}

  async execute({ index, limit }: ListChallengesRequest): Promise<ListChallengesResponse> {
    const challenges = await this.challengeQueryRepository.exploreList(index, limit);

    return challenges;
  }
}
