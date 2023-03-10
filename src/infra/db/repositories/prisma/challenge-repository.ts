import { Challenge } from "@src/modules/challenge/domain/challenge";
import { IChallengeRepository } from "../challenge-repository";
import { pool } from "../../config/pg/connection"
import { PrismaClient } from '@prisma/client'

export class ChallengeRepository implements IChallengeRepository{
  private _client: any

  constructor(){
    this._client = new PrismaClient()
  }

  async create(): Promise<void>{
    try {
      const user = await this._client.user.create({
        data: {
          name: 'Alice',
          email: 'alicea@prisma.io',
        },
      })
      this._client.$disconnect()
      console.log(user)

    } catch (error) {
      console.log(error)
    }
  }

  async getById(id: string): Promise<Challenge | null>{

  }

  async update(challenge: Challenge): Promise<void>{

  }

  async list(index?: number, limit?: number): Promise<Challenge[]>{

  }
}