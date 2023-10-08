import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { created } from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller } from '@core/infra/controller';
import { CreateChallengeUseCase } from './create-challenge';
import TYPES from '@src/core/types';
import { ChallengeDescription } from '../../domain/challenge-description';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';

@injectable()
export class CreateChallengeController extends Controller {
  constructor(@inject(TYPES.CreateChallengeUseCase) private readonly createChallengeUseCase: CreateChallengeUseCase) {
    super();
  }

  authenticationLevels: AuthenticationLevel[] = [AuthenticationLevel.basicUser];

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        title: z.string().min(3).max(70),
        description: z.string().min(ChallengeDescription.minlength).max(ChallengeDescription.maxlength),
        tags: z.array(z.string().min(2).max(50)),
      }),
    });
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, description, tags } = httpRequest.body;

    await this.createChallengeUseCase.execute({
      title,
      description,
      tags,
    });

    return created();
  }
}
