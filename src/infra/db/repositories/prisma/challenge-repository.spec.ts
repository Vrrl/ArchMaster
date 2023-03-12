import { Challenge } from "@src/modules/challenge/domain/challenge";
import { ChallengeDescription } from "@src/modules/challenge/domain/challenge-description";
import { ChallengeTitle } from "@src/modules/challenge/domain/challenge-title";
import { Tag } from "@src/modules/challenge/domain/tag";
import { test } from "vitest";
import { ChallengeRepository } from "./challenge-repository";



test.skip("a", async () => {
  const challengeRepository = new ChallengeRepository()

  const challenge = new Challenge({
    title: new ChallengeTitle({title: "Some title 2"}),
    description: new ChallengeDescription({description: "some description 2"}),
    tags: [new Tag({name: "tag name2"}), new Tag({name: "another 2"})],
    creatorId: "UUID-FAKE-FOR-TEST",
    verified: false,
    createdAt: new Date(),
  }, "139ccc91-361a-4137-b41b-001a80e0c5f7")

  const res = await challengeRepository.list(1,1)

  console.log(res)
})