import { describe, expect, it, beforeEach } from "vitest";
import { Challenge } from "../../domain/challenge";
import { MockProxy, mock, mockDeep } from 'vitest-mock-extended';
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository";
import { ChallengeDescription } from "../../domain/challenge-description";
import { ChallengeTitle } from "../../domain/challenge-title";
import { EditChallengeUseCase } from "./edit-challenge-use-case";
import { Tag } from "../../domain/tag";

describe("Edit challenge", () => {
  let mockChallengeRepository: MockProxy<IChallengeRepository>

  beforeEach(() => {
    mockChallengeRepository = mock<IChallengeRepository>()
  })


  it("should Edit a challenge", async () => {
    const sut = new EditChallengeUseCase(mockChallengeRepository)

    const challenge = new Challenge({
      title: new ChallengeTitle({title: "Some title"}),
      description: new ChallengeDescription({description: "some description"}),
      tags: [new Tag({name: "tag name"}), new Tag({name: "another"})],
      creatorId: "UUID-FAKE-FOR-TEST",
      verified: false,
      createdAt: new Date(),
    })

    mockChallengeRepository.getById.calledWith(challenge.id).mockResolvedValueOnce(challenge)

    const newTitle = "New Title"
    const newDescription = "New Description"
    const newTags = ["new", "description", "tags"]

    await expect(sut.execute({
      id: challenge.id,
      title: newTitle,
      description: newDescription,
      tags: newTags,
    })).resolves.toBeUndefined()

    expect(mockChallengeRepository.getById).toBeCalledTimes(1)
    expect(mockChallengeRepository.getById).toBeCalledWith(challenge.id)
    expect(mockChallengeRepository.update).toBeCalledTimes(1)
    expect(mockChallengeRepository.update).toBeCalledWith(challenge)
    expect(challenge.props.title.getValue()).toBe(newTitle)
    expect(challenge.props.description.getValue()).toBe(newDescription)
    expect(challenge.props.tags.map(tag => tag.name)).toStrictEqual(newTags)
  })
})
