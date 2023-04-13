import { describe, expect, it, beforeEach } from "vitest";
import { Challenge } from "../../domain/challenge";
import { InMemoryChallengeRepository } from "@src/infra/db/repositories/in-memory/in-memory-challenge-repository";
import { DisableChallengeUseCase } from "./disable-challenge";
import { Tag } from "../../domain/tag";
import { ChallengeDescription } from "../../domain/challenge-description";
import { ChallengeTitle } from "../../domain/challenge-title";
import { MockProxy, mock, mockDeep } from 'vitest-mock-extended';
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-query-repository";


describe("Disable challenge", () => {
  let mockChallengeRepository: MockProxy<IChallengeRepository>

  beforeEach(() => {
    mockChallengeRepository = mock<IChallengeRepository>()
  })


  it("should disable a challenge", async () => {

    const sut = new DisableChallengeUseCase(mockChallengeRepository)

    const challenge = new Challenge({
      title: new ChallengeTitle({title: "Some title"}),
      description: new ChallengeDescription({description: "some description"}),
      tags: [new Tag({name: "tag name"}), new Tag({name: "another"})],
      creatorId: "UUID-FAKE-FOR-TEST",
      verified: false,
      createdAt: new Date(),
    })

    mockChallengeRepository.getById.calledWith(challenge.id).mockResolvedValueOnce(challenge)

    await expect(sut.execute({
      id: challenge.id,
      userId: challenge.props.creatorId,
    })).resolves.toBeUndefined()

    expect(mockChallengeRepository.update).toBeCalledTimes(1)
    expect(mockChallengeRepository.update).toBeCalledWith(challenge)
    expect(mockChallengeRepository.getById).toBeCalledTimes(1)
    expect(mockChallengeRepository.getById).toBeCalledWith(challenge.id)
    expect(challenge.props.disabledAt).toBeTruthy()

  })

})
