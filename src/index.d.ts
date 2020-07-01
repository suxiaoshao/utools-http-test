import {UTools} from "utools-helper/@types/utools"
import axios from "axios"
import {WebData} from "@/util/http/webData";
import {WebHistory} from "@/util/http/webHistory";
import iconv from "iconv-lite"
import fs from "fs"
import form from "form-data"

declare global {
    interface Window {
        utools: UTools;
        axios: typeof axios
        iconv: typeof iconv,
        nodeFs: typeof fs,
        formData: typeof form
    }
}
declare global {
    type utools = UTools;
}
declare module 'vue/types/vue' {
    interface Vue {
        webData: WebData
        webHistory: WebHistory
    }
}
