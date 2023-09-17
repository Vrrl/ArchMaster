import container from '@core/injector';
import { Router } from '@core/infra/router';
import { CreateChallengeController } from './use-cases/create-challenge/create-challenge-controller';

const v1router = new Router('v1/challenge');

v1router.post('/', container.resolve(CreateChallengeController));

export { v1router };
