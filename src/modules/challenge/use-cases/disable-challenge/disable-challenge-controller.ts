import { ok } from "@core/infra/helpers/http";
import { HttpRequest, HttpResponse } from "@core/infra/http";
import { Controller } from "@core/infra/controller";
import { z } from "zod";
import { DisableChallengeUseCase } from "./disable-challenge";

export class DisableChallengeController extends Controller {
  constructor(private readonly disableChallengeUseCase: DisableChallengeUseCase) { super() }

  get requestSchema(): z.AnyZodObject {
    return z.object({
      params: z.object({
        id: z.string(),
      })
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id} = httpRequest.params
    const userId = "UUID-FAKE-FOR-TEST"

    const res = await this.disableChallengeUseCase.execute({
      id,
      userId,
    })

    return ok(res)
  }
}