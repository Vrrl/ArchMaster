import { CreateChallengeUseCase } from "./create-challenge";
import { describe, expect, it, beforeEach } from "vitest";
import { Challenge } from "../../domain/challenge";
import { MockProxy, mock } from 'vitest-mock-extended';
import { IChallengeRepository } from "@src/infra/db/repositories/challenge-repository";


describe("Create challenge", () => {
  let mockChallengeRepository: MockProxy<IChallengeRepository>

  beforeEach(() => {
    mockChallengeRepository = mock<IChallengeRepository>()
  })

  it("should create a challenge", async () => {
      const sut = new CreateChallengeUseCase(mockChallengeRepository)

      const creatorId = "UUID-FOR-TEST-15895"
      const title = "New Challenge"
      const description = "This is a new test challenge"
      const tags = ["new","test","architecture"]

      await expect(sut.execute({
        title: title,
        description: description,
        tags: tags,
        creatorId: creatorId
      })).resolves.toBeUndefined()

      expect(mockChallengeRepository.save).toBeCalledTimes(1)
  })
})
