// import { Challenge } from '@src/modules/challenge/domain/challenge';
// import { IChallengeQueryRepository } from '../challenge-query-repository';
// import { ChallengeMap } from './mappers/challenge-map';
// import { prismaErrorHandler } from '../../prisma/errors/handler';
// import { PrismaClient } from '@prisma/client';
// import { ListChallengesResponse } from '@src/modules/challenge/use-cases/list-challenges/list-challenges';

// export class ChallengeQueryRepository implements IChallengeQueryRepository {
//   constructor(private prisma: PrismaClient) {}

//   async exploreList(index?: number | undefined, limit?: number | undefined): Promise<ListChallengesResponse> {
//     const res = await this.prisma.challenge.findMany({
//       skip: index ? index : 0,
//       take: limit,
//       select: {
//         id: true,
//         title: true,
//         tags: true,
//         verified: true,
//         creator: { select: { name: true } },
//       },
//     });
//     console.log(res);
//     return res;
//   }

//   exists(id: string): Promise<boolean> {
//     throw new Error('Method not implemented.');
//   }

//   @prismaErrorHandler
//   async getById(id: string): Promise<Challenge | null> {
//     const challenge = await this.prisma.challenge.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     if (challenge === null) return null;

//     return ChallengeMap.toDomain(challenge);
//   }

//   @prismaErrorHandler
//   async list(limit?: number, index?: number): Promise<Challenge[]> {
//     const res = await this.prisma.challenge.findMany({
//       skip: index ? index : 0,
//       take: limit,
//     });

//     return res.map(challenge => ChallengeMap.toDomain(challenge));
//   }
// }
