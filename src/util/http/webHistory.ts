import {HistoryItem, RequestContentData, RequestHeadersData} from "@/util/interface";
import {deepCopy} from "@/util/util";
import {WebData} from "@/util/http/webData";
import {Method} from "axios";

export class WebHistory implements HistoryItem {
    public requestContentData: RequestContentData;
    public requestHeadersData: RequestHeadersData;
    public path: string
    public method: Method
    public host: string

    constructor(contentData: RequestContentData, headersData: RequestHeadersData, host: string, path: string, method: Method) {
        this.requestHeadersData = headersData
        this.requestContentData = contentData
        this.path = path
        this.method = method
        this.host = host
    }

    verifyName(name: string): boolean {
        return window.utools.db.get<HistoryItem>(name) !== null
    }

    pushToDb(name: string): boolean {
        const result = window.utools.db.put<HistoryItem>({
            _id: name,
            data: this
        })
        return result.ok
    }

    readFromWebData(webData: WebData) {
        this.requestContentData = deepCopy<RequestContentData>(webData.requestContentData)
        this.requestHeadersData = deepCopy<RequestHeadersData>(webData.requestHeadersData)
        this.host = webData.host
        this.path = webData.path
        this.method = webData.method
    }

    readFromHistoryItem(historyItem: HistoryItem) {
        this.host = historyItem.host
        this.path = historyItem.path
        this.requestHeadersData = deepCopy<RequestHeadersData>(historyItem.requestHeadersData)
        this.requestContentData = deepCopy<RequestContentData>(historyItem.requestContentData)
        this.method = historyItem.method
    }
}

