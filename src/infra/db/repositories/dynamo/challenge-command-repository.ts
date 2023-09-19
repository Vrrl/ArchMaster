import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { Challenge } from '@src/modules/challenge/domain/challenge';
import { IChallengeCommandRepository } from '../challenge-command-repository';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { ChallengeMap } from './mappers/challenge-map';

@injectable()
export class ChallengeCommandRepository implements IChallengeCommandRepository {
  constructor(@inject(TYPES.DynamoDBClient) private dynamoClient: DynamoDBClient) {}

  hardDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(challenge: Challenge): Promise<void> {
    const tableName = process.env.CHALLENGES_TABLE;

    const mappedChallenge = ChallengeMap.toPersistence(challenge);
    const putItemCommand = new PutItemCommand({ TableName: tableName, Item: marshall(mappedChallenge) });

    const response = await this.dynamoClient.send(putItemCommand);
    console.log(response);
  }

  async update(challenge: Challenge): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
