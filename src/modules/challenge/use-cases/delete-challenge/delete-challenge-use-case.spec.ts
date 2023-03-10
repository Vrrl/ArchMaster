import { describe, expect, it, beforeEach } from "vitest";
import { Challenge } from "../../domain/challenge";
import { MockProxy, mock, mockDeep } from 'vitest-mock-extended';
import { ChallengeRepository } from "@src/infra/db/repositories/challenge-repository";
import { ChallengeDescription } from "../../domain/challenge-description";
import { ChallengeTitle } from "../../domain/challenge-title";
import { Tag } from "../../domain/tag";
import { DeleteChallengeUseCase } from "./delete-challenge-use-case";

describe("Delete challenge", () => {
  let mockChallengeRepository: MockProxy<ChallengeRepository>

  beforeEach(() => {
    mockChallengeRepository = mock<ChallengeRepository>()
  })

  it("should soft delete a challenge", async () => {
    const sut = new DeleteChallengeUseCase(mockChallengeRepository)
    
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

    expect(mockChallengeRepository.getById).toBeCalledTimes(1)
    expect(mockChallengeRepository.getById).toBeCalledWith(challenge.id)
    expect(mockChallengeRepository.update).toBeCalledTimes(1)
    expect(challenge.props.deactivatedAt).toBeTruthy()
  })
})
