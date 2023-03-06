import { describe, expect, it } from "vitest";
import { Challenge } from "./challenge";
import { ChallengeDescription } from "./challenge-description";
import { ChallengeTitle } from "./challenge-title";
import { Tag } from "./tag";


describe("Challenge Title Object", () => {
  it("should instantiate a challenge title", () => {
    const title = "New challenge Advanced"

    const sut = new ChallengeTitle({title})

    expect(sut).toBeInstanceOf(ChallengeTitle)
  })

  it("should not instantiate a number challenge title", () => {
    const title = "New challenge Advanced with a really large title that should not be allowed in this"
    
    expect(() => {
      new ChallengeTitle({title})
    }).toThrow()
  })
})