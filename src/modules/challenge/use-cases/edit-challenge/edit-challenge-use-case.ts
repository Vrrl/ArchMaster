
interface EditChallengeRequest {
  name: string
}

type EditChallengeResponse = object

export class EditChallengeService {
  constructor(

  ) { }

  async execute({ name }: EditChallengeRequest): Promise<EditChallengeResponse> {

  }
}