import { Challenge } from "@src/modules/challenge/domain/challenge";
import { IChallengeRepository } from "../challenge-repository";
import { PrismaClient } from '@prisma/client'
import { ChallengeMap } from "./mappers/challenge-map";
import { prisma } from "@src/infra/db/prisma/client";

export class ChallengeRepository implements IChallengeRepository{

  constructor(){
  }

  async create(challenge: Challenge): Promise<void>{
    try {

      await prisma.challenge.create({
        data: ChallengeMap.toPrismaPersistence(challenge),
      })

    } catch (error) {
      console.log(error)
    }
    
  }

  async getById(id: string): Promise<Challenge | null>{
    try {

      const challenge = await prisma.challenge.findUnique({
        where: {
          id: id,
        },
      })

      if(challenge !== null) return ChallengeMap.prismaToDomain(challenge)

    } catch (error) {
      console.log(error)
    }
    return null
  }

  async update(challenge: Challenge): Promise<void>{
    try {
      const res = await prisma.challenge.update({
        where: {
          id: challenge.id,
        },
        data: ChallengeMap.toPrismaPersistence(challenge),
      })

    } catch (error) {
      console.log(error)
    }
  }

  async list(limit?: number, index?: number): Promise<Challenge[]>{
    try {

      const res = await prisma.challenge.findMany({
        skip: index ? index : 0,
        take: limit,
      })

      return res.map(challenge => ChallengeMap.prismaToDomain(challenge))
    } catch (error) {
      console.log(error)
    }
    return []
  }
}