import { Controller, ControllerFactory } from '@core/infra/controller';
import { InMemoryAppointmentRepository } from '@infra/db/repositories/in-memory/in-memory-appointment-repository';
import { CreateAppointmentController } from './create-appointment-controller';
import { CreateAppointmentUseCase } from './create-appointment-use-case';

export class CreateAppointmentControllerFactory extends ControllerFactory {
  makeController(): Controller {
    const AppointmentRepository = new InMemoryAppointmentRepository();
    const createAppointmentService = new CreateAppointmentUseCase(AppointmentRepository);
    return new CreateAppointmentController(createAppointmentService);
  }
}
