/**
 * @desc
 * UseCase interface
 */
export interface IUseCase<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
