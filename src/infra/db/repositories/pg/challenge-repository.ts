import { Challenge } from "@src/modules/challenge/domain/challenge";
import { IChallengeRepository } from "../challenge-repository";
import { pool } from "../../pg/connection"


export class ChallengeRepository implements IChallengeRepository{

  async create(): Promise<void>{
    try {
      const client = await pool.connect();

      const sql = "SELECT * FROM tb_user";
      const { rows } = await client.query(sql);

      console.log(rows[0])

      client.release();

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