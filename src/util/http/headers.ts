import {Header, HeadersObject, HeaderValue, HeaderValueObject} from "@/util/interface";


//将headerValue转化成HeaderValueObject
export function getHeaderValueObject(value: HeaderValue): HeaderValueObject {
    let valueObject: HeaderValueObject = {}
    if (typeof value === "string") {
        const valueStringList = value.split(/; ?/g)
        valueStringList.forEach(item => {
            valueObject[item.split("=")[0]] = item.split("=")[1]
        })
    } else {
        value.forEach(item1 => {
            const valueStringList = item1.split(/; ?/g)
            valueStringList.forEach(item => {
                valueObject[item.split("=")[0]] = item.split("=")[1]
            })
        })
    }
    return valueObject
}

// 转化headersObject数据到header[]
export function getHeaderListFromHeadersObject(headersObject: HeadersObject): Header[] {
    let headerList: Header[] = []
    Object.keys(headersObject).forEach(value => {
        if (typeof headersObject[value] === "string") {
            headerList.push({name: value, value: headersObject[value] as string})
        } else {
            (headersObject[value] as string[]).forEach(item => {
                headerList.push({name: value, value: item})
            })
        }
    })
    return headerList
}

/*// 转换header[]数据到headersObject
export function getHeadersObjectFromHeaderList(headerList: Header[]): HeadersObject {
    let headersObject: HeadersObject = {}
    headerList.forEach(item => {
        if (item.name in headersObject) {
            (headersObject[item.name] as string[]).push(item.value)
        } else {
            headersObject[item.name] = [item.value]
        }
    })
    return headersObject
}*/
