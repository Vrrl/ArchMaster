import { test } from "vitest";
import { ChallengeRepository } from "./challenge-repository";



test("a", async () => {
  const challengeRepository = new ChallengeRepository()

  await challengeRepository.create()
})