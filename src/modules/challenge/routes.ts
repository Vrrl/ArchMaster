import express from 'express'
import { CreateAppointmentControllerFactory } from './factories/create-appointment-controller-factory'
import { adaptController } from '@infra/http/adapters/express-adapters';


const router = express.Router()

router.get("/", adaptController(new CreateAppointmentControllerFactory()));

export default router