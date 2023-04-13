import { Challenge } from "@src/modules/challenge/domain/challenge";

export interface IChallengeCommandRepository{
    hardDelete(id: string): Promise<void>;
    delete(id: string): Promise<void>;
    save(challenge: Challenge): Promise<void>;
    update(challenge: Challenge): Promise<void>;
}