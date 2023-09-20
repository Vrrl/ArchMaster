import { IMapper } from '@src/core/infra/mapper';
import { Challenge } from '@src/modules/challenge/domain/challenge';

export class ChallengeMap implements IMapper<Challenge> {
  public static toDomain(schema: any): Challenge {
    const challenge = Challenge.createFromPrimitive(
      {
        title: schema.title,
        description: schema.description,
        tags: schema.tags,
        creatorId: schema.creatorId,
        verified: schema.verified,
        createdAt: new Date(schema.createdAt),
        deactivatedAt: schema.deactivatedAt,
        disabledAt: schema.disabledAt,
        editedAt: schema.editedAt,
      },
      schema.id,
    );

    return challenge;
  }

  public static toPersistence(challenge: Challenge): any {
    return {
      id: challenge.id,
      title: challenge.title.getValue(),
      description: challenge.description.getValue(),
      tags: challenge.tags.map(tag => tag.name),
      verified: challenge.verified,
      createdAt: challenge.createdAt,
      editedAt: challenge.editedAt,
      deactivatedAt: challenge.deactivatedAt,
      disabledAt: challenge.disabledAt,
      creatorId: challenge.creatorId,
    };
  }
}
