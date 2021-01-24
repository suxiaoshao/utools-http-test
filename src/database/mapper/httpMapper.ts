import { Repository } from 'typeorm';
import { connect } from '../main';
import { HttpEntity } from '../entity/http.entity';
import { TagEntity } from '../entity/tag.entity';
import { RequestMapper } from './requestMapper';

export class HttpMapper {
  private static async getHttpRepository(): Promise<Repository<HttpEntity>> {
    const database = await connect;
    return database.getRepository(HttpEntity);
  }

  public static async saveHttp(http: HttpEntity): Promise<HttpEntity> {
    const httpRepository = await this.getHttpRepository();
    return await httpRepository.save(http);
  }

  public static async saveHttps(http: HttpEntity[]): Promise<HttpEntity[]> {
    const httpRepository = await this.getHttpRepository();
    return await httpRepository.save(http);
  }

  public static async getTagsByHttpId(httpId: number | undefined): Promise<TagEntity[]> {
    const tagRepository = await this.getHttpRepository();
    return (
      (
        await tagRepository
          .createQueryBuilder('http')
          .leftJoinAndSelect('http.tags', 'tag')
          .where('http.httpId = :httpId', { httpId: httpId })
          .getOne()
      )?.tags ?? []
    );
  }

  public static async getAllHttp(): Promise<HttpEntity[]> {
    const httpRepository = await this.getHttpRepository();
    return await httpRepository.find({ relations: ['tags'] });
  }

  public static async deleteHttp(httpId: number): Promise<void> {
    const httpRepository = await this.getHttpRepository();
    const newHttp = await httpRepository.findOne({
      where: { httpId: httpId },
      relations: ['request'],
    });
    await httpRepository.delete({ httpId: httpId });
    await RequestMapper.delete(newHttp?.request?.requestId ?? -1);
  }
}
