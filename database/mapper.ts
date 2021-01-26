import { connect } from './main';
import { CookieEntity } from './entity/cookie.entity';
import { Repository } from 'typeorm';
import { HttpEntity } from './entity/http.entity';
import { RequestEntity } from './entity/request.entity';
import { TagEntity } from './entity/tag.entity';

export async function getCookieRepository(): Promise<Repository<CookieEntity>> {
  const database = await connect;
  return database.getRepository(CookieEntity);
}

export async function getHttpRepository(): Promise<Repository<HttpEntity>> {
  const database = await connect;
  return database.getRepository(HttpEntity);
}

export async function getRequestRepository(): Promise<Repository<RequestEntity>> {
  const database = await connect;
  return database.getRepository(RequestEntity);
}

export async function getTagRepository(): Promise<Repository<TagEntity>> {
  const database = await connect;
  return database.getRepository(TagEntity);
}
