import { ok } from "@core/infra/helpers/http";
import { HttpRequest, HttpResponse } from "@core/infra/http";
import { Controller } from "@core/infra/controller";
import { CreateChallengeUseCase } from "./create-challenge-use-case";
import { z } from "zod";

export class CreateChallengeController extends Controller {
  constructor(private readonly createChallengeUseCase: CreateChallengeUseCase) { super() }

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        title: z.string().min(3).max(70),
        description: z.string().max(2000),
        tags: z.array(z.string().min(2).max(50)),
        creatorId: z.string(),
      })
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, description, tags, creatorId } = httpRequest.body


    const res = await this.createChallengeUseCase.execute({
      title,
      description,
      tags,
      creatorId
    })

    return ok(res)
  }
}