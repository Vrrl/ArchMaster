import { Challenge } from "@modules/challenge/domain/challenge";
import { ChallengeRepository } from "../challenge-repository";

export class InMemoryChallengeRepository implements ChallengeRepository {
  public items: Challenge[] = [];

  async create(challenge: Challenge): Promise<void> {
    this.items.push(challenge)
  }

  async getById(id: string): Promise<Challenge | null> {
    const challenge = this.items.find(i => i.id === id)
    if (challenge !== undefined)
      return challenge
    return null;
  }

  async update(challenge: Challenge): Promise<void> {
    const index = this.items.findIndex(c => c.id === challenge.id)
    console.log(this.items)
    this.items[index] = challenge
    console.log(this.items)

  }
}