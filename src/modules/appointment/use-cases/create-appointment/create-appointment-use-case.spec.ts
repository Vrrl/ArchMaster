import { describe, expect, it } from 'vitest';
import { Appointment } from '../../domain/appointment';
import { InMemoryAppointmentRepository } from '@src/infra/db/repositories/in-memory/in-memory-appointment-repository';
import { CreateAppointmentUseCase } from './create-appointment-use-case';

describe('Create Appointment', () => {
  it('should create an appointment', () => {
    const inMemoryAppointmentRepository = new InMemoryAppointmentRepository();
    const sut = new CreateAppointmentUseCase(inMemoryAppointmentRepository);

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(startsAt.getDate() + 1);

    expect(
      sut.execute({
        customer: '',
        startsAt: startsAt,
        endsAt: endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });
});
