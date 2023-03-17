import { ok } from "@core/infra/helpers/http";
import { HttpRequest, HttpResponse } from "@core/infra/http";
import { Controller } from "@core/infra/controller";
import { z } from "zod";
import { ListChallengesUseCase } from "./list-challenges";

export class ListChallengesController extends Controller {
  constructor(private readonly listChallengeUseCase: ListChallengesUseCase) { super() }

  get requestSchema(): z.AnyZodObject {
    return z.object({
      query: z.object({
        index: z.number().optional(),
        limit: z.number().max(100).min(1).optional(),
      })
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { index, limit} = httpRequest.query


    const res = await this.listChallengeUseCase.execute({
      index,
      limit,
    })

    return ok(res)
  }
}