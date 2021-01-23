import { Repository } from 'typeorm';
import { connect } from '../main';
import { RequestEntity } from '../entity/request.entity';

export class RequestMapper {
  private static async getRequestRepository(): Promise<Repository<RequestEntity>> {
    const database = await connect;
    return database.getRepository(RequestEntity);
  }

  public static async delete(requestId: number): Promise<void> {
    const requestRepository = await this.getRequestRepository();
    await requestRepository.delete({ requestId: requestId });
  }
}
