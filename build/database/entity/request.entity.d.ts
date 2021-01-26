import { RequestBodyChoose, RequestTextChoose } from '../../src/util/http/httpRequest';
export declare class RequestEntity {
    requestId: number | undefined;
    bodyChoose: RequestBodyChoose | undefined;
    textChoose: RequestTextChoose | undefined;
    text: string | undefined;
    dataForms: string | undefined;
    xForms: string | undefined;
    headers: string | undefined;
}
