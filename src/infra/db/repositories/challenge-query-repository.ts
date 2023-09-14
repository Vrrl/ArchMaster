import { Challenge } from '@src/modules/challenge/domain/challenge';
import { ListChallengesResponse } from '@src/modules/challenge/use-cases/list-challenges/list-challenges';

export interface IChallengeQueryRepository {
  getById(id: string): Promise<Challenge | null>;
  list(index?: number, limit?: number): Promise<Challenge[]>;
  exploreList(index?: number, limit?: number): Promise<ListChallengesResponse>;
  exists(id: string): Promise<boolean>;
}
