import { Challenge } from "@src/modules/challenge/domain/challenge";

export interface IChallengeRepository{
    create(challenge: Challenge): Promise<void>;
    getById(id: string): Promise<Challenge | null>;
    update(challenge: Challenge): Promise<void>;
    list(index?: number, limit?: number): Promise<Challenge[]>
}