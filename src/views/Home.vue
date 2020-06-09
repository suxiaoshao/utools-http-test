<template>
    <div class="home" id="home">

        <!-- 头部 -->
        <div class="row items-center my-header absolute-top">
            <q-btn flat class="test-button" round @click="test">
                <q-icon style="color: rgb(41,131,187)" class="cursor-pointer">
                    <svg class="icon"
                         style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                         viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M27.004302 377.13466L954.437748 3.789475c36.863015-14.57375 80.870025 14.57375 66.296275 58.58076L814.558323 984.517125c-7.286875 43.86413-66.296275 51.151005-88.299779 22.003505L475.932955 684.46933l353.341998-453.78657-404.778763 402.635565L27.004302 472.149795c-36.720135-14.57375-36.720135-73.15451 0-95.015135z m0 0"/>
                    </svg>
                </q-icon>
            </q-btn>
            <q-select class="col-2 col-lg-1" v-model="allData.method" :options="methodList" label="method"/>
            <q-input class="col-4 col-lg-3" v-model="allData.host" label="host" @blur="formatHost"/>
            <q-input class="col-grow" v-model="allData.path" label="path" @blur="formatPath"/>
        </div>

        <!-- 页脚 -->
        <div class="absolute-bottom my-footer">
            <q-tabs v-model="allData.tab" style="color: rgb(17,101,154)" align="justify">

                <!-- request选项 -->
                <q-tab name="request-headers" no-caps>
                    <q-icon size="24px">
                        <svg class="icon"
                             style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                             viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M230.4 563.2v204.8h563.2v-204.8H870.4v281.6H153.6V563.2h76.8zM256 435.2V512H153.6V435.2h102.4z m204.8 0V512H358.4V435.2h102.4z m204.8 0V512h-102.4V435.2h102.4z m204.8 0V512h-102.4V435.2h102.4z m0-256v204.8h-76.8V256h-563.2v128H153.6v-204.8h716.8zM665.6 307.2v76.8H358.4V307.2h307.2z"/>
                        </svg>
                    </q-icon>
                    request-headers
                </q-tab>

                <!-- cookies选项 -->
                <q-tab name="request-content" no-caps>
                    <q-icon size="24px">
                        <svg class="icon"
                             style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                             viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M810.666667 896 341.333333 896 341.333333 298.666667 810.666667 298.666667M810.666667 213.333333 341.333333 213.333333C294.4 213.333333 256 251.733333 256 298.666667L256 896C256 942.933333 294.4 981.333333 341.333333 981.333333L810.666667 981.333333C857.6 981.333333 896 942.933333 896 896L896 298.666667C896 251.733333 857.6 213.333333 810.666667 213.333333M682.666667 42.666667 170.666667 42.666667C123.733333 42.666667 85.333333 81.066667 85.333333 128L85.333333 725.333333 170.666667 725.333333 170.666667 128 682.666667 128 682.666667 42.666667Z"/>
                        </svg>
                    </q-icon>
                    request-content
                </q-tab>

                <!-- response -->
                <q-tab name="response-headers" no-caps style="color: #639a67">
                    <q-icon size="24px">
                        <svg class="icon"
                             style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                             viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M810.666667 896 341.333333 896 341.333333 298.666667 810.666667 298.666667M810.666667 213.333333 341.333333 213.333333C294.4 213.333333 256 251.733333 256 298.666667L256 896C256 942.933333 294.4 981.333333 341.333333 981.333333L810.666667 981.333333C857.6 981.333333 896 942.933333 896 896L896 298.666667C896 251.733333 857.6 213.333333 810.666667 213.333333M682.666667 42.666667 170.666667 42.666667C123.733333 42.666667 85.333333 81.066667 85.333333 128L85.333333 725.333333 170.666667 725.333333 170.666667 128 682.666667 128 682.666667 42.666667Z"/>
                        </svg>
                    </q-icon>
                    response-headers
                </q-tab>

                <!-- response-header -->
                <q-tab name="response-content" no-caps style="color: #639a67">
                    <q-icon size="24px">
                        <svg class="icon"
                             style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                             viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M230.4 563.2v204.8h563.2v-204.8H870.4v281.6H153.6V563.2h76.8zM256 435.2V512H153.6V435.2h102.4z m204.8 0V512H358.4V435.2h102.4z m204.8 0V512h-102.4V435.2h102.4z m204.8 0V512h-102.4V435.2h102.4z m0-256v204.8h-76.8V256h-563.2v128H153.6v-204.8h716.8zM665.6 307.2v76.8H358.4V307.2h307.2z"/>
                        </svg>
                    </q-icon>
                    response-content
                </q-tab>
            </q-tabs>
        </div>

        <!--         页面主体 -->
        <div class="my-main">
            <q-tab-panels class="fit" v-model="allData.tab" animated>
                <q-tab-panel name="request-headers">
                    <my-request-headers :request-headers-data="allData.requestHeadersData"></my-request-headers>
                </q-tab-panel>

                <q-tab-panel name="request-content">
                    <my-request-content :request-content-data="allData.requestContentData"></my-request-content>
                </q-tab-panel>

                <q-tab-panel name="response-headers">
                    <my-response-headers :response-headers-data="allData.responseHeadersData"></my-response-headers>
                </q-tab-panel>

                <q-tab-panel name="response-content">
                    <my-response-content :response-content-data="allData.responseContentData"></my-response-content>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import myRequestHeaders from "@/components/home/myRequestHeaders.vue";
    import myRequestContent from "@/components/home/myRequestContent.vue";
    import myResponseContent from "@/components/home/myResponseContent.vue";
    import myResponseHeaders from "@/components/home/myResponseHeaders.vue";
    import WebData from "@/util/data";

    interface HttpData {
        methodList: string[]
        allData: WebData
    }

    export default Vue.extend({
        name: 'Home',
        data(): HttpData {
            return {
                methodList: ["GET", "POST", "PUT", "PATCH", "HEAD", "DELETE", "OPTION"],
                allData: this.webData
            }
        },
        methods: {
            formatHost() {
                //完整的url链接
                if (/^http(s)?:\/\/(.+\.)*.+(:\d+)?(\/.*)?$/.test(this.allData.host)) {
                    const re = this.allData.host.match(/^(.*?:\/\/[^/]+)(\/.*)?$/)!
                    this.allData.host = re[1]
                    switch (re[2]) {
                        case undefined:
                            break
                        case "/":
                            break
                        default:
                            this.allData.path = re[2]
                    }
                } //端口号
                else if (/^\d+$/.test(this.allData.host)) {
                    this.allData.host = `http://localhost:${this.allData.host}`
                }//未匹配
                else {
                    this.$q.notify({
                        message: "输入的host值既不是合法url路径也不是合法端口号",
                        color: "red-5",
                        position: "top-right"
                    })
                    this.allData.host = ""
                }
            },
            formatPath() {
                if (this.allData.path !== "" && !/^\/.*$/.test(this.allData.path)) {
                    this.$q.notify({
                        message: "输入的host值不是合法url的路径",
                        color: "red-5",
                        position: "top-left"
                    })
                    this.allData.path = ""
                }
            },
            test() {
                this.webData.networkAccess()
            }
        },
        components: {
            "my-request-headers": myRequestHeaders,
            "my-request-content": myRequestContent,
            "my-response-headers": myResponseHeaders,
            "my-response-content": myResponseContent
        },
        computed: {}
    })
</script>
<style scoped lang="scss">
    .home {
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        .my-footer {
            z-index: 2000;
        }

        .my-header {
            z-index: 2000;
        }

        .test-button {
            height: 42px;
            margin-right: 10px;
        }

        .my-main {
            position: absolute;
            top: 56px;
            bottom: 53px;
            left: 0;
            right: 0;
            overflow: auto;
        }
    }
</style>
