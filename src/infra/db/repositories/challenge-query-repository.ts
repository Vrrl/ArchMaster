import { Challenge } from "@src/modules/challenge/domain/challenge";

export interface IChallengeQueryRepository{
    getById(id: string): Promise<Challenge | null>;
    list(index?: number, limit?: number): Promise<Challenge[]>
    exists(id: string): Promise<boolean>;
}