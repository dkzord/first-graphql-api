// """""Controller"""""

import { Arg, Field, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { CreateAppointmentInput } from '../dtos/inputs/creat-appointment-input';
import { AppointmentModel } from '../dtos/models/appointment-model';
import { Customer } from '../dtos/models/customer-model';

@Resolver(() => AppointmentModel)
export class AppointmentsResolver {
  @Query(() => [AppointmentModel])
  async appointments() {
    return [{
      startsAt: new Date(),
      endsAt: new Date(),
    }];
  }

  @Mutation(() => AppointmentModel)
  async createAppointment(@Arg('data') data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    }

    return appointment;
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: AppointmentModel) {
    console.log(appointment);

    return {
      name: 'John Doe',
    };
  }
}