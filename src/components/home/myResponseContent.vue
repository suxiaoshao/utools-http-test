<template>
    <div class="my-response-content">
        <div class="row absolute-top">
            <q-select v-model="responseContentData.choose" class="col-grow" :options="options" label="显示类型"
                      emit-value></q-select>
            <q-input v-model="responseContentData.charset" class="col-6" label="编码方式" @blur="changeCharset"></q-input>
        </div>
        <div class="my-main">
            <q-tab-panels class="fit" v-model="responseContentData.choose" animated>
                <q-tab-panel name="empty">
                </q-tab-panel>

                <q-tab-panel name="text">
                    <my-response-text :value="responseContentData.text"></my-response-text>
                </q-tab-panel>
                <q-tab-panel name="xml">
                    <my-response-xml :value="responseContentData.text"></my-response-xml>
                </q-tab-panel>
                <q-tab-panel name="json">
                    <my-response-json :value="responseContentData.text"></my-response-json>
                </q-tab-panel>
                <q-tab-panel name="html">
                    <my-response-html :value="responseContentData.text"></my-response-html>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import {ResponseContentData} from "@/util/interface";
    import contentJson from "@/components/home/responseContent/contentJson.vue";
    import contentHtml from "@/components/home/responseContent/contentHtml.vue";
    import contentXml from "@/components/home/responseContent/contentXml.vue";
    import contentText from "@/components/home/responseContent/contentText.vue";

    interface OptionItem {
        label: string,
        value: "empty" | "text" | "json" | "xml" | "html"
    }

    interface Data {
        options: OptionItem[]
    }

    export default Vue.extend({
        name: "myResponse",
        props: {
            responseContentData: Object as () => ResponseContentData
        },
        data(): Data {
            return {
                options: [
                    {
                        value: "empty",
                        label: "空"
                    },
                    {
                        value: "text",
                        label: "字符串"
                    },
                    {
                        value: "xml",
                        label: "xml"
                    },
                    {
                        value: "json",
                        label: "json"
                    },
                    {
                        value: "html",
                        label: "html"
                    }
                ]
            }
        },
        components: {
            "my-response-json": contentJson,
            "my-response-html": contentHtml,
            "my-response-xml": contentXml,
            "my-response-text": contentText
        },
        methods: {
            changeCharset() {
                this.webData.setResponseDataText()
            }
        }
    })
</script>

<style scoped lang="scss">
    .my-response-content {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 10px;

        .my-main {
            position: absolute;
            top: 56px;
            bottom: 0;
            right: 0;
            left: 0;
        }

    }
</style>
