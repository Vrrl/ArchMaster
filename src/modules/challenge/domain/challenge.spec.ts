import { describe, expect, it } from "vitest";
import { Challenge } from "./challenge";
import { ChallengeDescription } from "./challenge-description";
import { ChallengeTitle } from "./challenge-title";
import { Tag } from "./tag";


describe("Challenge Object", () => {
  it("should instantiate a challenge", () => {
    const title = new ChallengeTitle({title: "New Challenge"})
    const description = new ChallengeDescription({description: "This is a new test challenge"})
    const tags = [new Tag({name: "new"}), new Tag({name: "test"}), new Tag({name: "architecture"})]
    const creatorId = "UUDI-RANDOM-STRING-TEST"
    const verified = false
    const createdAt = new Date()

    const sut = new Challenge({
      title: title,
      description: description,
      tags: tags,
      creatorId: creatorId,
      verified: verified,
      createdAt: createdAt
    })

    expect(sut).toBeInstanceOf(Challenge)
  })
})