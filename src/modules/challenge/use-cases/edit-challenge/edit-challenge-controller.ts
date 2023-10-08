import { ok } from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller } from '@core/infra/controller';
import { z } from 'zod';
import { EditChallengeUseCase } from './edit-challenge';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';

export class EditChallengeController extends Controller {
  authenticationLevels?: AuthenticationLevel[] | undefined;
  constructor(private readonly editChallengeUseCase: EditChallengeUseCase) {
    super();
  }

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
      }),
      params: z.object({
        id: z.string(),
      }),
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, description, tags } = httpRequest.body;
    const { id } = httpRequest.params;
    // const userId = 'UUID-FAKE-FOR-TEST';

    const res = await this.editChallengeUseCase.execute({
      id,
      title,
      description,
      tags,
    });

    return ok(res);
  }
}
