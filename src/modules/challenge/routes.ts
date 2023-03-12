import express from 'express'
import { adaptController } from '@infra/http/adapters/express-adapters';
import { CreateChallengeControllerFactory } from './use-cases/create-challenge/create-challenge-controller-factory';


const router = express.Router()

router.post("/", adaptController(new CreateChallengeControllerFactory()));

export default router