import container from '@core/injector';
// import { ListChallengesControllerFactory } from './use-cases/list-challenges/list-challenges-controller-factory';
// import { DisableChallengeControllerFactory } from './use-cases/disable-challenge/disable-challenge-controller-factory';
// import { EditChallengeControllerFactory } from './use-cases/edit-challenge/edit-challenge-controller-factory';
// import { DeleteChallengeControllerFactory } from './use-cases/delete-challenge/delete-challenge-controller-factory';
import { Router } from '@core/infra/router';
import { CreateChallengeController } from './use-cases/create-challenge/create-challenge-controller';

const v1router = new Router('v1/challenge');

v1router.post('/', container.resolve(CreateChallengeController));
// v1router.get("/", adaptController(new ListChallengesControllerFactory()));
// v1router.delete("/:id", adaptController(new DeleteChallengeControllerFactory()));
// v1router.patch("/:id", adaptController(new EditChallengeControllerFactory()));
// v1router.post("/:id/disable", adaptController(new DisableChallengeControllerFactory()));

export { v1router };
