import express from 'express'
import AppointmentRoutes from "@src/modules/appointment/routes"

const v1Router = express.Router();

v1Router.use('/appointments', AppointmentRoutes);

// All routes go here 

export { v1Router }




