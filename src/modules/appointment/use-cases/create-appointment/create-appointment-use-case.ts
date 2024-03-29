import { Appointment } from '@src/modules/appointment/domain/appointment';
import { IAppointmentRepository } from '@src/infra/db/repositories/appointment-repository';
import { IUseCase } from '@src/core/use-case';

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointmentUseCase implements IUseCase<CreateAppointmentRequest, CreateAppointmentResponse> {
  constructor(private AppointmentRepository: IAppointmentRepository) {}

  async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointment = new Appointment({ customer, startsAt, endsAt });

    this.AppointmentRepository.create(appointment);

    return appointment;
  }
}
