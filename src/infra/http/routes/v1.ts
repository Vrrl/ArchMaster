import express from 'express'
import AppointmentRoutes from "@src/modules/appointment/routes"
import ChallengeRoutes from "@src/modules/challenge/routes"

const v1Router = express.Router();

// v1Router.use('/appointments', AppointmentRoutes);
v1Router.use('/challenges', ChallengeRoutes);

// All routes go here 

export { v1Router }




