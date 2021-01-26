import { Repository } from 'typeorm';
import { RequestEntity } from '../entity/request.entity';

export class RequestMapper {
  private static async getRequestRepository(): Promise<Repository<RequestEntity>> {
    return await window.mapper.getRequestRepository();
  }

  public static async delete(requestId: number): Promise<void> {
    const requestRepository = await this.getRequestRepository();
    await requestRepository.delete({ requestId: requestId });
  }

  public static async save(request: RequestEntity): Promise<RequestEntity> {
    const requestRepository = await this.getRequestRepository();
    return await requestRepository.save(request);
  }

  public static async saves(requests: RequestEntity[]): Promise<RequestEntity[]> {
    const requestRepository = await this.getRequestRepository();
    return await requestRepository.save(requests);
  }
}
