import { Appointment } from "../../appointment/domain/appointment";

export interface AppointmentRepository{
    create(appointment: Appointment): Promise<void>;
}