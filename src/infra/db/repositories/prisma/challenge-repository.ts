import { Challenge } from "@src/modules/challenge/domain/challenge";
import { IChallengeRepository } from "../challenge-repository";
import { ChallengeMap } from "./mappers/challenge-map";
import { prismaErrorHandler } from "../../prisma/errors/handler";
import { PrismaClient } from "@prisma/client";

export class ChallengeRepository implements IChallengeRepository{

  constructor(private prisma: PrismaClient){}

  hardDelete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  @prismaErrorHandler
  async save(challenge: Challenge): Promise<void>{

    await this.prisma.challenge.create({
      data: ChallengeMap.toPersistence(challenge),
    })
    
  }

  @prismaErrorHandler
  async getById(id: string): Promise<Challenge | null>{

    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: id,
      },
    })

    if(challenge === null) return null

    return ChallengeMap.toDomain(challenge)
  }

  @prismaErrorHandler
  async update(challenge: Challenge): Promise<void>{

    const res = await this.prisma.challenge.update({
      where: {
        id: challenge.id,
      },
      data: ChallengeMap.toPersistence(challenge),
    })
  }

  @prismaErrorHandler
  async list(limit?: number, index?: number): Promise<Challenge[]>{
    const res = await this.prisma.challenge.findMany({
      skip: index ? index : 0,
      take: limit,
    })

    return res.map(challenge => ChallengeMap.toDomain(challenge))
  }
}