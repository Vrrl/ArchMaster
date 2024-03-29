import { ok } from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller } from '@core/infra/controller';
import { z } from 'zod';
import { DeleteChallengeUseCase } from './delete-challenge';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';

export class DeleteChallengeController extends Controller {
  authenticationLevels?: AuthenticationLevel[] | undefined;
  constructor(private readonly deleteChallengeUseCase: DeleteChallengeUseCase) {
    super();
  }

  get requestSchema(): z.AnyZodObject {
    return z.object({
      params: z.object({
        id: z.string(),
      }),
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const userId = 'UUID-FAKE-FOR-TEST';

    const res = await this.deleteChallengeUseCase.execute({
      id,
      // userId,
    });

    return ok(res);
  }
}
