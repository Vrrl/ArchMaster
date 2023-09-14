import { Appointment } from '../../appointment/domain/appointment';

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<void>;
}
