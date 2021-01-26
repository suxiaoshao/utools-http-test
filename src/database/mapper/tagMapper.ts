import { Repository } from 'typeorm';
import { TagEntity } from '../entity/tag.entity';

export class TagMapper {
  private static async getTagRepository(): Promise<Repository<TagEntity>> {
    return await window.mapper.getTagRepository();
  }

  public static async saveTags(tags: TagEntity): Promise<TagEntity> {
    const tagRepository = await this.getTagRepository();
    return await tagRepository.save(tags);
  }

  public static async getAllTags(): Promise<TagEntity[]> {
    const tagRepository = await this.getTagRepository();
    return await tagRepository.find();
  }

  public static async deleteTags(tags: TagEntity[]): Promise<void> {
    const tagRepository = await this.getTagRepository();
    await tagRepository.remove(tags);
  }
}
