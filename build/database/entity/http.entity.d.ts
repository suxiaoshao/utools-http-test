import { Method } from 'axios';
import { RequestEntity } from './request.entity';
import { TagEntity } from './tag.entity';
export declare class HttpEntity {
    httpId: number | undefined;
    url: string | undefined;
    name: string | undefined;
    method: Method | undefined;
    request: RequestEntity | undefined;
    tags: TagEntity[] | undefined;
}
