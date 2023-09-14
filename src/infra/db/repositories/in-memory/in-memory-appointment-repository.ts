import { Appointment } from '../../../appointment/domain/appointment';
import { AppointmentRepository } from '../appointment-repository';

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }
}
