import {UTools} from "utools-helper/@types/utools"
import axios from "axios"
import WebData from "@/util/data";
import iconv from "iconv-lite"

declare global {
    interface Window {
        utools: UTools;
        axios: typeof axios
        iconv: typeof iconv
    }
}
declare global {
    type utools = UTools;
}
declare module 'vue/types/vue' {

    interface Vue {
        webData: WebData
    }
}
