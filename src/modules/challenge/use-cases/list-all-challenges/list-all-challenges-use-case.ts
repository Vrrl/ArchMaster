
interface ListAllChallengesRequest{
  index: number
  quantity: number
}

type ListAllChallengesResponse = object[]

export class ListAllChallengesService{
  constructor(

  ){}

  async execute({index}: ListAllChallengesRequest): Promise<ListAllChallengesResponse> {
    
  }
}