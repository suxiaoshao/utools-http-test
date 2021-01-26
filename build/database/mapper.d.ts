import { CookieEntity } from './entity/cookie.entity';
import { Repository } from 'typeorm';
import { HttpEntity } from './entity/http.entity';
import { RequestEntity } from './entity/request.entity';
import { TagEntity } from './entity/tag.entity';
export declare function getCookieRepository(): Promise<Repository<CookieEntity>>;
export declare function getHttpRepository(): Promise<Repository<HttpEntity>>;
export declare function getRequestRepository(): Promise<Repository<RequestEntity>>;
export declare function getTagRepository(): Promise<Repository<TagEntity>>;
