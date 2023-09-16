import { Appointment } from '../../../appointment/domain/appointment';
import { IAppointmentRepository } from '../appointment-repository';

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }
}
