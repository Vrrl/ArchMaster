import { describe, expect, it } from "vitest";
import { Challenge } from "../../domain/challenge";
import { InMemoryChallengeRepository } from "@src/infra/db/repositories/in-memory/in-memory-challenge-repository";
import { CreateChallengeUseCase } from "./create-challenge-use-case";


describe("Create challenge", () => {
  it("should create a challenge", () => {
      const inMemoryChallengeRepository = new InMemoryChallengeRepository()
      const sut = new CreateChallengeUseCase(inMemoryChallengeRepository)
      
      const creatorId = "UUID-FOR-TEST-15895"
      const title = "New Challenge"
      const description = "This is a new test challenge"
      const tags = ["new","test","architecture"]

      expect(sut.execute({
        title: title,
        description: description,
        tags: tags,
        creatorId: creatorId
      })).resolves
  })
})
