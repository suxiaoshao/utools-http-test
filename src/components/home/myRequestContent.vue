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
                    <my-text v-model="requestContentData.text"></my-text>
                </q-tab-panel>
                <q-tab-panel name="files">
                    <my-request-content-files :content-file-data="requestContentData.files"></my-request-content-files>
                </q-tab-panel>
                <q-tab-panel name="json">
                    <my-text v-model="requestContentData.text" language="json"></my-text>
                </q-tab-panel>
                <q-tab-panel name="form">
                    <my-request-content-form :form-data="requestContentData.form"></my-request-content-form>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue"
    import {RequestContentData} from "@/util/interface";
    import contentForm from "@/components/home/requestContent/contentForm.vue";
    import contentFiles from "@/components/home/requestContent/contentFiles.vue";
    import myText from "@/components/myText.vue";

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
            "my-request-content-form": contentForm,
            "my-request-content-files": contentFiles,
            "my-text": myText
        },
        props: {
            requestContentData: Object as PropType<RequestContentData>
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
