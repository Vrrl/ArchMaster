import { adaptController } from '@infra/http/adapters/express-adapters';
import { CreateChallengeControllerFactory } from './use-cases/create-challenge/create-challenge-controller-factory';
// import { ListChallengesControllerFactory } from './use-cases/list-challenges/list-challenges-controller-factory';
// import { DisableChallengeControllerFactory } from './use-cases/disable-challenge/disable-challenge-controller-factory';
// import { EditChallengeControllerFactory } from './use-cases/edit-challenge/edit-challenge-controller-factory';
// import { DeleteChallengeControllerFactory } from './use-cases/delete-challenge/delete-challenge-controller-factory';
import { Router } from '../infra/router';

const v1router = new Router('v1/challenge');

v1router.post('/', adaptController(new CreateChallengeControllerFactory()));
// v1router.get("/", adaptController(new ListChallengesControllerFactory()));
// v1router.delete("/:id", adaptController(new DeleteChallengeControllerFactory()));
// v1router.patch("/:id", adaptController(new EditChallengeControllerFactory()));
// v1router.post("/:id/disable", adaptController(new DisableChallengeControllerFactory()));

export { v1router };
