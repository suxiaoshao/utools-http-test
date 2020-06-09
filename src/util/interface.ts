import {Method} from "axios";

/*
* request and response's interface
* */
export type HeaderValue = string | string[]

export interface Header {
    name: string
    value: string
}

export interface HeadersObject {
    [parm: string]: HeaderValue
}

export interface HeaderValueObject {
    [parm: string]: string | undefined
}


export interface Cookie {
    name: string
    value: string
    domain: string
    path: string
    creatTime: number
    maxAge: {
        use: boolean
        value: number
    }
}

export interface RequestFormData {
    name: string
    value: string
}

export interface RequestUploadFile {
    path: string
    name: string
}

export interface RequestHeadersData {
    headers: Header[]
    cookies: Cookie[]
}


export interface RequestContentData {
    choose: "empty" | "text" | "files" | "json" | "form"
    contentType: string
    otherContentType: string
    text: string
    files: RequestUploadFile[]
    json: string
    form: RequestFormData[]
}

export interface ResponseContentData {
    choose: "empty" | "text" | "json" | "xml" | "html"
    charset: string
    buffer: Buffer
    text: string
    arrayBuffer: ArrayBuffer
}

export interface ALLData {
    host: string,
    method: Method
    path: string
    tab: "request-headers" | "request-content" | "response-headers" | "response-content"
    requestHeadersData: RequestHeadersData
    requestContentData: RequestContentData
    responseContentData: ResponseContentData
    responseHeadersData: Header[]
}

/*
* other data interface
* */

export interface Column {
    name: string
    label: string
    field: string | Function
    required?: boolean
    align?: string
    sortable?: boolean
    sort?: Function
    format?: Function
    style?: string
    classes?: string
    headerStyle?: string
    headerClasses?: string
}

