import { describe, expect, it, beforeEach } from "vitest";
import { Challenge } from "../../domain/challenge";
import { MockProxy, mock, mockDeep } from 'vitest-mock-extended';
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository";
import { ChallengeDescription } from "../../domain/challenge-description";
import { ChallengeTitle } from "../../domain/challenge-title";
import { Tag } from "../../domain/tag";
import { ListChallengesUseCase } from "./list-challenges";

describe("Create challenge", () => {
  let mockChallengeRepository: MockProxy<IChallengeRepository>

  beforeEach(() => {
    mockChallengeRepository = mock<IChallengeRepository>()
  })


  it("should Edit a challenge", async () => {
    const sut = new ListChallengesUseCase(mockChallengeRepository)
    
    // TODO: create fixtures generators of challenges
    const challenge = new Challenge({
      title: new ChallengeTitle({title: "Some title"}),
      description: new ChallengeDescription({description: "some description"}),
      tags: [new Tag({name: "tag name"}), new Tag({name: "another"})],
      creatorId: "UUID-FAKE-FOR-TEST",
      verified: false,
      createdAt: new Date(),
    })

    const challenges = [challenge]

    mockChallengeRepository.list.mockResolvedValueOnce(challenges)

    await expect(sut.execute({})).resolves.toStrictEqual(challenges)

    expect(mockChallengeRepository.list).toBeCalledTimes(1)
  })
})
