import { CreateAppointmentUseCase } from "./create-appointment-use-case";
import { ok } from "@core/infra/helpers/http";
import { HttpRequest, HttpResponse } from "@core/infra/http";
import { Controller } from "@core/infra/controller";

export class CreateAppointmentController extends Controller {
  constructor(private readonly createAppointmentUseCase: CreateAppointmentUseCase) { super() }

  validationRules(): Record<string, string> {
    return {
      'body.customer': 'required|string|min:3',
      'body.startsAt': 'required|date',
      'body.endsAt': 'required|date|after:body.startsAt',
    }
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { customer, startsAt, endsAt } = httpRequest.body

    const res = await this.createAppointmentUseCase.execute({
      customer,
      startsAt,
      endsAt
    })

    return ok(res)
  }
}