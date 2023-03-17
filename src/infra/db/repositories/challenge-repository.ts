import { Challenge } from "@src/modules/challenge/domain/challenge";

export interface IChallengeRepository{
    hardDelete(id: string): Promise<void>;
    delete(id: string): Promise<void>;
    save(challenge: Challenge): Promise<void>;
    update(challenge: Challenge): Promise<void>;
    getById(id: string): Promise<Challenge | null>;
    list(index?: number, limit?: number): Promise<Challenge[]>
    exists(id: string): Promise<void>;
}