
interface SubmitChallengeRequest {
  name: string
}

type SubmitChallengeResponse = object

export class SubmitChallengeService {
  constructor(

  ) { }

  async execute({ name }: SubmitChallengeRequest): Promise<SubmitChallengeResponse> {

  }
}