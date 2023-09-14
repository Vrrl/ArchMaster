import { expect, test } from 'vitest';
import { Appointment } from './appointment';

test('create an appointment', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 2);
  endsAt.setDate(startsAt.getDate() + 1);

  const appointment = new Appointment({
    endsAt: endsAt,
    startsAt: startsAt,
    customer: '',
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('');
});

test('cannot create an appointment with end date less than start date', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 2);
  endsAt.setDate(startsAt.getDate() - 1);

  expect(() => {
    return new Appointment({
      endsAt: endsAt,
      startsAt: startsAt,
      customer: '',
    });
  }).toThrow();
});

test('cannot create an appointment with start date less than now', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(startsAt.getDate() + 3);
  startsAt.setDate(startsAt.getDate() - 1);

  expect(() => {
    return new Appointment({
      endsAt: endsAt,
      startsAt: startsAt,
      customer: '',
    });
  }).toThrow();
});
