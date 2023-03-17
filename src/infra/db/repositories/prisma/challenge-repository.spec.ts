import { Challenge } from "@src/modules/challenge/domain/challenge";
import { ChallengeDescription } from "@src/modules/challenge/domain/challenge-description";
import { ChallengeTitle } from "@src/modules/challenge/domain/challenge-title";
import { Tag } from "@src/modules/challenge/domain/tag";
import { describe, expect, it, test } from "vitest";
import { ChallengeRepository } from "./challenge-repository";

// TODO: make repo tests & depency injection
describe("Challenge repository tests", () => {

  it.skip("Create a challenge", async () => {
    const sut = new ChallengeRepository()

    const challenge = new Challenge({
      title: ChallengeTitle.create({title: "Some title 2"}),
      description: ChallengeDescription.create({description: "some description 2"}),
      tags: [Tag.create({name: "tag name2"}), Tag.create({name: "another 2"})],
      creatorId: "UUID-FAKE-FOR-TEST",
      verified: false,
      createdAt: new Date(),
    }, "139ccc91-361a-4137-b41b-001a80e0c5f7")
  
    await expect(sut.create()).toBe() 
  })

  it.skip("Should list challenges", async () => {
    const sut = new ChallengeRepository()

    await expect(sut.list(1,0)).toBe() 
  })
})
