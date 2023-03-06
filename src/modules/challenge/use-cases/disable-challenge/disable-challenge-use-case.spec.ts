import { describe, expect, it } from "vitest";
import { Challenge } from "../../domain/challenge";
import { InMemoryChallengeRepository } from "@src/infra/db/repositories/in-memory/in-memory-challenge-repository";
import { DisableChallengeUseCase } from "./disable-challenge-use-case";
import { Tag } from "../../domain/tag";
import { ChallengeDescription } from "../../domain/challenge-description";
import { ChallengeTitle } from "../../domain/challenge-title";


describe("Disable challenge", () => {
  it("should disable a challenge", () => {
    const inMemoryChallengeRepository = new InMemoryChallengeRepository()
    const sut = new DisableChallengeUseCase(inMemoryChallengeRepository)

    const creatorId = "UUID-FAKE-FOR-TEST"
    
    const titleOrError = new ChallengeTitle({title: "Some title"})
    const descriptionOrError = new ChallengeDescription({description: "some description"})
    const tagsOrError = [new Tag({name: "tag name"}), new Tag({name: "another"})]

    const challenge = new Challenge({
      title: titleOrError,
      description: descriptionOrError,
      tags: tagsOrError,
      creatorId: creatorId,
      verified: false,
      createdAt: new Date(),
    })

    // TODO: probably this is not the best way to test. learn more about mocking
    inMemoryChallengeRepository.create(Object.create(challenge))

    expect(sut.execute({
      id: challenge.id,
      userId: creatorId,
    })).resolves

    const res = inMemoryChallengeRepository.items.find(i => i.id === challenge.id) as Challenge

    expect(typeof res.props.disabledAt).toBe(typeof Date)
  })
})
