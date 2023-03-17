import express from 'express'
import { adaptController } from '@infra/http/adapters/express-adapters';
import { CreateChallengeControllerFactory } from './use-cases/create-challenge/create-challenge-controller-factory';
import { ListChallengesControllerFactory } from './use-cases/list-challenges/list-challenges-controller-factory';
import { DisableChallengeControllerFactory } from './use-cases/disable-challenge/disable-challenge-controller-factory';
import { EditChallengeControllerFactory } from './use-cases/edit-challenge/edit-challenge-controller-factory';
import { DeleteChallengeControllerFactory } from './use-cases/delete-challenge/delete-challenge-controller-factory';


const router = express.Router()

router.post("/", adaptController(new CreateChallengeControllerFactory()));
router.get("/", adaptController(new ListChallengesControllerFactory()));
router.delete("/:id", adaptController(new DeleteChallengeControllerFactory()));
router.patch("/:id", adaptController(new EditChallengeControllerFactory()));
router.post("/:id/disable", adaptController(new DisableChallengeControllerFactory()));

export default router