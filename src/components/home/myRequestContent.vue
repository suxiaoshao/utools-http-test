<template>
    <div class="my-request-content">
        <div class="absolute-top row">
            <q-select class="col-3" v-model="requestContentData.choose" :options="options" label="request body的类型"
                      @input="requestBodyTypeChange" emit-value/>
            <q-input :disable="requestContentData.choose!=='text'" v-model="requestContentData.contentType"
                     class="col-5" label="content-type"></q-input>
            <q-input v-model="requestContentData.otherContentType" class="col-4" label="other-content-type"></q-input>
        </div>
        <div class="my-main">
            <q-tab-panels class="fit" v-model="requestContentData.choose" animated>
                <q-tab-panel name="empty">
                </q-tab-panel>

                <q-tab-panel name="text">
                    <my-request-content-text v-model="requestContentData.text"></my-request-content-text>
                </q-tab-panel>
                <q-tab-panel name="files">
                    <my-request-content-files :content-file-data="requestContentData.files"></my-request-content-files>
                </q-tab-panel>
                <q-tab-panel name="json">
                    <my-request-content-json v-model="requestContentData.json"></my-request-content-json>
                </q-tab-panel>
                <q-tab-panel name="form">
                    <my-request-content-form :form-data="requestContentData.form"></my-request-content-form>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import {RequestContentData} from "@/util/interface";
    import contentText from "@/components/home/requestContent/contentText.vue";
    import contentJson from "@/components/home/requestContent/contentJson.vue";
    import contentForm from "@/components/home/requestContent/contentForm.vue";
    import contentFiles from "@/components/home/requestContent/contentFiles.vue";

    interface OptionItem {
        label: string,
        value: "empty" | "text" | "files" | "json" | "form"
    }

    interface Data {
        tab: string
        options: OptionItem[]
    }

    export default Vue.extend({
        name: "myCookies",
        components: {
            "my-request-content-text": contentText,
            "my-request-content-json": contentJson,
            "my-request-content-form": contentForm,
            "my-request-content-files": contentFiles
        },
        props: {
            requestContentData: Object as () => RequestContentData
        },
        data(): Data {
            return {
                tab: '',
                options: [
                    {
                        value: "empty",
                        label: "空"
                    },
                    {
                        value: "text",
                        label: "自定义"
                    },
                    {
                        value: "files",
                        label: "文件"
                    },
                    {
                        value: "json",
                        label: "json"
                    },
                    {
                        value: "form",
                        label: "原生表单"
                    }
                ]
            }
        },
        methods: {
            requestBodyTypeChange(val: string) {
                switch (val) {
                    case "empty":
                        this.requestContentData.contentType = ""
                        break
                    case "text":
                        this.requestContentData.contentType = ""
                        break
                    case "files":
                        this.requestContentData.contentType = "multipart/form-data"
                        break
                    case "json":
                        this.requestContentData.contentType = "application/json"
                        break
                    case "form":
                        this.requestContentData.contentType = "application/x-www-form-urlencoded"
                        break
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    .my-request-content {
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
