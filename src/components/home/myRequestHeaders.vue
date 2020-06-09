<template>
    <div class="my-request-headers">

        <div class="absolute-top">
            <q-tabs v-model="tab" style="color: rgb(17,101,154)" switch-indicator inline-label dense>

                <!-- headers选项 -->
                <q-tab name="headers" no-caps>
                    headers
                </q-tab>

                <!-- cookies选项 -->
                <q-tab name="cookies" no-caps>
                    cookies
                </q-tab>
            </q-tabs>
        </div>

        <div class="my-main">
            <q-tab-panels v-model="tab" animated class="fit">
                <q-tab-panel name="headers" class="my-tab">


                    <q-table separator="cell" :data="requestHeadersData.headers" :columns="headersColumns"
                             row-key="name" :rows-per-page-options="[0]" :pagination.sync="pagination" virtual-scroll
                             style="max-height: 100%">
                        <template v-slot:top>
                            <q-btn flat @click="addHeader" round>
                                <add-icon></add-icon>
                            </q-btn>
                        </template>
                        <template v-slot:body="props">
                            <q-tr :props="props">

                                <!-- name列 -->
                                <q-td key="name" :props="props">
                                    {{props.row.name}}
                                    <q-popup-edit title="name" v-model.lazy="props.row.name" buttons label-set="保存"
                                                  label-cancel="取消" :validate="validateHeaderName"
                                                  @hide="validateHeaderName(props.row.name)">
                                        <q-input v-model.lazy="props.row.name" dense autofocus :error="errorProtein"
                                                 :error-message="errorMessageProtein"></q-input>
                                    </q-popup-edit>
                                </q-td>

                                <!-- value列 -->
                                <q-td key="value" :props="props">
                                    {{props.row.value}}
                                    <q-popup-edit title="value" v-model="props.row.value" buttons label-set="保存"
                                                  label-cancel="取消">
                                        <q-input v-model="props.row.value" dense autofocus></q-input>
                                    </q-popup-edit>
                                </q-td>
                                <q-td key="operation" :props="props" auto-width>
                                    <q-btn flat @click="deleteHeader(props.rowIndex)" round>
                                        <delete-icon></delete-icon>
                                    </q-btn>
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </q-tab-panel>

                <q-tab-panel name="cookies">
                    <q-table separator="cell" :data="requestHeadersData.cookies" :columns="cookieColumns"
                             row-key="name" :rows-per-page-options="[0]" :pagination.sync="pagination" virtual-scroll
                             style="max-height: 100%">

                        <!-- 头部 -->
                        <template v-slot:top>
                            <q-btn flat @click="addCookie" round>
                                <add-icon></add-icon>
                            </q-btn>
                        </template>

                        <!-- 表格主体 -->
                        <template v-slot:body="props">
                            <q-tr :props="props">

                                <!-- name列 -->
                                <q-td key="name" :props="props">
                                    {{props.row.name}}
                                    <q-popup-edit title="name" v-model.lazy="props.row.name" buttons label-set="保存"
                                                  label-cancel="取消" :validate="validateCookieName"
                                                  @hide="validateCookieName(props.row.name)">
                                        <q-input v-model.lazy="props.row.name" dense autofocus :error="errorProtein"
                                                 :error-message="errorMessageProtein"></q-input>
                                    </q-popup-edit>
                                </q-td>

                                <!-- value列 -->
                                <q-td key="value" :props="props">
                                    {{props.row.value}}
                                    <q-popup-edit title="value" v-model="props.row.value" buttons label-set="保存"
                                                  label-cancel="取消">
                                        <q-input v-model="props.row.value" dense autofocus></q-input>
                                    </q-popup-edit>
                                </q-td>

                                <!-- domain列 -->
                                <q-td key="domain" :props="props">
                                    {{props.row.domain}}
                                    <q-popup-edit title="domain" v-model="props.row.domain" buttons label-set="保存"
                                                  label-cancel="取消">
                                        <q-input v-model="props.row.domain" dense autofocus></q-input>
                                    </q-popup-edit>
                                </q-td>

                                <q-td key="path" :props="props">
                                    {{props.row.path}}
                                    <q-popup-edit title="path" v-model="props.row.path" buttons label-set="保存"
                                                  label-cancel="取消">
                                        <q-input v-model="props.row.path" dense autofocus></q-input>
                                    </q-popup-edit>
                                </q-td>

                                <q-td key="maxAge" :props="props">
                                    {{props.row.maxAge.use?props.row.maxAge.value:"关闭"}}

                                    <q-popup-edit title="maxAge" v-model="props.row.maxAge" buttons label-set="保存"
                                                  label-cancel="取消">
                                        <q-toggle v-model="props.row.maxAge.use" label="是否使用"></q-toggle>
                                        <q-input dense autofocus v-model.number="props.row.maxAge.value"
                                                 type="number"></q-input>
                                    </q-popup-edit>
                                </q-td>

                                <q-td key="operation" :props="props">
                                    <q-btn flat @click="deleteCookie(props.rowIndex)" round>
                                        <delete-icon></delete-icon>
                                    </q-btn>
                                </q-td>

                            </q-tr>
                        </template>
                    </q-table>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import {Column, RequestHeadersData} from "@/util/interface";
    import deleteIcon from "@/components/icon/deleteIcon.vue";
    import editIcon from "@/components/icon/editIcon.vue";
    import addIcon from "@/components/icon/addIcon.vue";


    interface Data {
        tab: string
        headersColumns: Column[]
        cookieColumns: Column[]
        errorProtein: boolean
        errorMessageProtein: string
        pagination: {
            rowsPerPage: number
        }
    }

    export default Vue.extend({
        name: "request",
        data(): Data {
            return {
                tab: "headers",
                headersColumns: [
                    {
                        name: "name",
                        label: "name",
                        field: "name",
                        align: 'left'
                    },
                    {
                        name: "value",
                        label: "value",
                        field: "value",
                        align: 'left'
                    },
                    {
                        name: "operation",
                        label: "操作",
                        field: "operation",
                        align: "left"
                    }
                ],
                cookieColumns: [
                    {
                        name: "name",
                        label: "name",
                        field: "name",
                        align: 'left'
                    },
                    {
                        name: "value",
                        label: "value",
                        field: "value",
                        align: 'left'
                    },
                    {
                        name: "domain",
                        label: "domain",
                        field: "domain",
                        align: 'left'
                    },
                    {
                        name: "path",
                        label: "path",
                        field: "path",
                        align: 'left'
                    },
                    {
                        name: "maxAge",
                        label: "max-age",
                        field: "maxAge",
                        align: 'left'
                    },
                    {
                        name: "operation",
                        label: "操作",
                        field: "operation",
                        align: "left"
                    }
                ],
                errorProtein: false,
                errorMessageProtein: "",
                pagination: {
                    rowsPerPage: 0
                }
            }
        },
        props: {
            requestHeadersData: Object as () => RequestHeadersData
        },
        methods: {
            addHeader() {
                this.requestHeadersData.headers.push({name: "", value: ""})
            },
            deleteHeader(index: number) {
                this.requestHeadersData.headers.splice(index, 1)
            },
            validateHeaderName(name: string) {
                const saveList = this.requestHeadersData.headers.filter(item => {
                    return item.name === name
                })
                if (saveList.length > 1) {

                    this.errorProtein = true
                    this.errorMessageProtein = "name值不允许同时重复"
                    return false
                }
                this.errorProtein = false
                this.errorMessageProtein = ''
                return true
            },
            addCookie() {
                const nowData = Date.now() / 1000
                let domain: string
                if (this.webData.toDetermineWhetherUrl()) {
                    domain = this.webData.host.match(/\/\/(.*)$/)![1]
                } else {
                    domain = ""
                }
                this.requestHeadersData.cookies.push({
                    name: "",
                    value: "",
                    domain: domain,
                    path: "/",
                    creatTime: nowData,
                    maxAge: {
                        use: false,
                        value: 1000
                    }
                })
            },
            deleteCookie(index: number) {
                this.requestHeadersData.cookies.splice(index, 1)
            },
            validateCookieName(name: string) {
                const saveList = this.requestHeadersData.cookies.filter(item => {
                    return item.name === name
                })
                if (saveList.length > 1) {
                    let result: boolean = false
                    saveList.forEach((item1, index) => {
                        saveList.slice(index + 1).forEach(item2 => {
                            if (item2.domain === item1.domain && item2.path === item1.path) {
                                result = true
                            }
                        })
                    })
                    if (result) {
                        this.errorProtein = true
                        this.errorMessageProtein = "name、path、domain值不允许同时重复"
                        return false
                    }
                }
                this.errorProtein = false
                this.errorMessageProtein = ''
                return true
            },
        },
        components: {
            "delete-icon": deleteIcon,
            "edit-icon": editIcon,
            "add-icon": addIcon
        }
    })
</script>

<style scoped lang="scss">
    .my-request-headers {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        .my-main {
            position: absolute;
            top: 36px;
            bottom: 0;
            right: 0;
            left: 0;
        }
    }
</style>
