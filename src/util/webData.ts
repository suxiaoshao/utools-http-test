import {
    ALLData, Header,
    HeadersObject,
    HeaderValueObject,
    RequestContentData,
    RequestHeadersData,
    ResponseContentData
} from "@/util/interface";
import {Method} from "axios";
import {Notify} from "quasar";
import {getHeaderListFromHeadersObject, getHeaderValueObject} from "@/util/headers";
import FormData from "form-data"


export default class WebData implements ALLData {
    public host: string = "";
    public method: Method = "GET";
    public path: string = "";
    public tab: "request-headers" | "request-content" | "response-headers" | "response-content" = "request-headers";
    public requestContentData: RequestContentData = {
        choose: "empty",
        otherContentType: "charset=utf-8",
        contentType: "",
        text: "",
        files: [],
        json: "{}",
        form: []
    };
    public requestHeadersData: RequestHeadersData = {
        headers: [
            {
                name: "accept",
                value: "*/*"
            },
            {
                name: "cache-control",
                value: "no-cache"
            },
            {
                name: "user-agent",
                value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45"
            }
        ],
        cookies: []
    };
    public responseContentData: ResponseContentData = {
        choose: "empty",
        charset: "utf-8",
        buffer: new Buffer(0),
        text: ""
    }
    public responseHeadersData: Header[] = []

    constructor() {
    }

    // 网络访问的主入口
    networkAccess() {
        const url: string = this.host + this.path
        if (/^http(s)?:\/\/(.+\.)*.+(:\d+)?(\/.*)?$/.test(url)) {
            const headers: HeadersObject = this.getRequestHeadersObject()
            const data: string | FormData = this.getRequestData()
            if (typeof data !== "string") {
                Object.assign(headers, data.getHeaders())
            }
            window.axios.request({
                url: url,
                headers: headers,
                data: data,
                method: this.method,
                responseType: "arraybuffer"
            }).then(res => {
                console.log(res)
                this.responseContentData.buffer = res.data
                this.setResponseDataCharset(res.headers)
                this.setResponseDataChoose(res.headers)
                this.setResponseDataText()
                this.responseHeadersData = getHeaderListFromHeadersObject(res.headers)
                this.setCookie()
                this.tab = "response-content"
            })
                .catch(error => {
                    const errorString = error.toString()
                    Notify.create({
                        message: "错误信息",
                        color: "red-5",
                        position: "top",
                        caption: errorString
                    })
                    this.responseContentData.text = errorString
                    this.responseContentData.choose = "text"
                    this.responseContentData.charset = "utf-8"
                    this.responseContentData.buffer = new Buffer(errorString)
                    this.tab = "response-content"
                    console.log(error)
                })
        } else {
            Notify.create({
                message: "'host'+'path'不是合法的url",
                color: "red-5",
                position: "top"
            })
        }
    }

    //从response中设置cookie
    setCookie() {
        this.responseHeadersData.forEach(header => {

            //获取set-cookie请求头
            if (header.name === "set-cookie" || header.name === "Set-Cookie") {

                //初始化赋值
                let domain: string = ""
                let path: string = ""
                let name: string = ""
                let value: string = ""
                let maxAge: {
                    use: boolean
                    value: number
                } = {
                    use: false,
                    value: 1000
                }
                const creatTime = Date.now() / 1000

                // 获取cookieValueObject以便接下来的分析
                const cookieValueObject: HeaderValueObject = getHeaderValueObject(header.value)

                //遍历cookieValueObject
                Object.keys(cookieValueObject).forEach(item => {

                    //分情况讨论
                    if (item === "Domain") {
                        domain = cookieValueObject[item]!
                    } else if (item === "Path") {
                        path = cookieValueObject[item]!
                    } else if (item === "Max-Age") {
                        maxAge.use = true
                        maxAge.value = Number(cookieValueObject[item]!)
                    } else if (item !== "Expires" && item !== "Secure" && item !== "HttpOnly" && item !== "SameSite") {
                        name = item
                        value = cookieValueObject[item]!
                    }
                })

                //如果set-cookie没有设置domain,则自己设置
                if (domain === "" && this.toDetermineWhetherUrl()) {
                    domain = this.host.match(/\/\/(.*)$/)![1]
                }

                //如果set-cookie没有设置path，则自己设置
                if (path === "") {
                    path = "/"
                }

                //先删除之前的cookie
                this.requestHeadersData.cookies.forEach((value, index) => {
                    if (value.name === name && value.domain === domain && value.path === path) {
                        this.requestHeadersData.cookies.splice(index, 1)
                    }
                })

                //如果maxAge设置大于0或者没有使用maxAge则添加这个cookie
                if (maxAge.value > 0 || !maxAge.use) {
                    this.requestHeadersData.cookies.push({
                        domain: domain,
                        path: path,
                        name: name,
                        value: value,
                        maxAge: maxAge,
                        creatTime: creatTime
                    })
                }
            }
        })
    }

    //获取responseContent的text属性
    setResponseDataText() {
        this.responseContentData.text = window.iconv.decode(this.responseContentData.buffer, this.responseContentData.charset)
    }

    //获取responseContent的charset属性
    setResponseDataCharset(headersObject: HeadersObject) {
        let charset: string = "utf-8"
        Object.keys(headersObject).forEach(value => {
            if (value === "content-type") {
                const valueObject: HeaderValueObject = getHeaderValueObject(headersObject[value])
                if ("charset" in valueObject) {
                    charset = valueObject['charset']!
                }
            }
        })
        this.responseContentData.charset = charset
    }

    //获取responseContent的choose属性
    setResponseDataChoose(headersObject: HeadersObject) {
        let choose: "empty" | "text" | "json" | "xml" | "html" | "image" = "text"
        Object.keys(headersObject).forEach(value => {
            if (value === "content-type") {
                const valueObject: HeaderValueObject = getHeaderValueObject(headersObject[value])
                if ("application/json" in valueObject) {
                    choose = "json"
                } else if ("text/html" in valueObject) {
                    choose = "html"
                } else if ("text/xml" in valueObject) {
                    choose = "xml"
                } else if ("image/png" in valueObject || "image/jpeg" in valueObject) {
                    choose = "image"
                }
            }
        })
        this.responseContentData.choose = choose
    }

    //获取发送的data属性
    getRequestData(): string | FormData {
        if (this.method === "GET" || this.method === "HEAD" || this.method === "DELETE"
            || this.method === "OPTIONS" || this.requestContentData.choose === "empty") {
            return ""
        } else if (this.requestContentData.choose === "json") {
            return this.requestContentData.json
        } else if (this.requestContentData.choose === "text") {
            return this.requestContentData.text
        } else if (this.requestContentData.choose === "form") {
            return this.getRequestFormString()
        } else if (this.requestContentData.choose === "files") {
            const form = new window.formData()
            this.requestContentData.files.forEach(item => {
                form.append(item.name, window.nodeFs.createReadStream(item.path))
            })
            return form
        } else {
            return ""
        }
    }

    //将form数据格式化
    getRequestFormString(): string {
        let formStringList: string[] = []
        this.requestContentData.form.forEach(item => {
            formStringList.push(`${item.name}=${item.value}`)
        })
        return formStringList.join("&")
    }

    // 获取需要的headers属性
    getRequestHeadersObject(): HeadersObject {
        let headersObject: HeadersObject = {}

        //获取cookies
        const cookiesStr = this.getRequestCookiesStr()
        if (cookiesStr !== "") {
            headersObject["cookie"] = cookiesStr
        }

        //获取content-type

        const contentType = this.getRequestContentType()
        if (contentType !== "") {
            headersObject['content-type'] = contentType
        }
        this.requestHeadersData.headers.forEach(item => {
            headersObject[item.name] = item.value
        })
        return headersObject
    }

    //获取headers中的cookies的value
    getRequestCookiesStr(): string {
        let cookieValueList: {
            value: string
            name: string
        }[] = []
        this.requestHeadersData.cookies.forEach(item => {
            const nowData = Date.now() / 1000
            if (RegExp(item.domain + "$").test(this.host) &&
                (RegExp("^" + item.path).test(this.path) || item.path === "/") &&
                (!item.maxAge.use || item.creatTime + item.maxAge.value < nowData)) {
                cookieValueList.push({value: item.value, name: item.name})
            }
        })
        let cookieStrList: string[] = []
        cookieValueList.forEach(item => {
            cookieStrList.push(`${item.name}=${item.value}`)
        })
        return cookieStrList.join("; ")
    }

    //获取发送的headers标签的content-type的值
    getRequestContentType(): string {
        if (this.method === ("GET" || "HEAD" || "DELETE" || "OPTIONS")
            || this.requestContentData.choose === "empty") {
            return ""
        } else {
            return this.requestContentData.contentType + "; " + this.requestContentData.otherContentType
        }

    }

    //判断url是否正确
    toDetermineWhetherUrl(): boolean {
        return /^http(s)?:\/\/(.+\.)*.+(:\d+)?(\/.*)?$/.test(this.host)
    }
}
