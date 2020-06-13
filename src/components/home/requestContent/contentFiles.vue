<template>
    <div class="content-files">
        <q-table :data="contentFileData" :columns="columns" separator="cell" :rows-per-page-options="[0]"
                 :pagination.sync="pagination" virtual-scroll style="max-height: 100%" row-key="name">
            <template v-slot:top>
                <q-btn flat @click="addFile" round>
                    <add-icon></add-icon>
                </q-btn>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">

                    <!-- name列 -->
                    <q-td key="name" :props="props">
                        {{props.row.name}}
                        <q-popup-edit title="name" v-model.lazy="props.row.name" buttons label-set="保存"
                                      label-cancel="取消" :validate="validateFileName"
                                      @hide="validateFileName(props.row.name)">
                            <q-input v-model.lazy="props.row.name" dense autofocus :error="errorProtein"
                                     :error-message="errorMessageProtein"></q-input>
                        </q-popup-edit>
                    </q-td>

                    <!-- value列 -->
                    <q-td key="path" :props="props">
                        {{props.row.path}}
                    </q-td>
                    <q-td key="operation" :props="props" auto-width>
                        <q-btn flat @click="deleteFile(props.rowIndex)" round>
                            <delete-icon></delete-icon>
                        </q-btn>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue"
    import {Column, RequestUploadFile} from "@/util/interface";
    import deleteIcon from "@/components/icon/deleteIcon.vue";
    import addIcon from "@/components/icon/addIcon.vue";

    interface Data {
        columns: Column[]
        pagination: {
            rowsPerPage: number
        }
        errorProtein: boolean
        errorMessageProtein: string
    }

    export default Vue.extend({
        name: "contentFile",
        props: {
            contentFileData: Array as PropType<RequestUploadFile[]>
        },
        data(): Data {
            return {
                columns: [
                    {
                        name: "name",
                        label: "name",
                        field: "name",
                        align: 'left'
                    },
                    {
                        name: "path",
                        label: "path",
                        field: "path",
                        align: 'left'
                    },
                    {
                        name: "operation",
                        label: "操作",
                        field: "operation",
                        align: "left"
                    }
                ],
                pagination: {
                    rowsPerPage: 0
                },
                errorProtein: false,
                errorMessageProtein: ""
            }
        },
        methods: {
            addFile(): void {
                const filePath = window.utools.showOpenDialog({
                    title: "读取文件",
                    properties: [
                        "openFile",
                        "multiSelections",
                        "showHiddenFiles"
                    ]
                })
                if (filePath === undefined) {
                    this.$q.notify({
                        message: "没有成功选择文件",
                        color: "red-4",
                        position: "top"
                    })
                } else {
                    filePath.forEach(value => {
                        const name = this.getNewName(value)
                        this.contentFileData.push({name: name, path: value})
                    })
                }
            },
            deleteFile(index: number): void {
                this.contentFileData.splice(index, 1)
            },
            validateFileName(name: string) {
                const num = this.contentFileData.filter(item => {
                    return item.name === name
                }).length
                if (num > 1) {
                    this.errorProtein = true
                    this.errorMessageProtein = "name值不允许重复"
                    return false
                } else if (name === "") {
                    this.errorProtein = true
                    this.errorMessageProtein = "name值不允许为空"
                    return false
                } else {
                    this.errorProtein = false
                    this.errorMessageProtein = ''
                    return true
                }
            },
            getNewName(path: string): string {
                const result = path.match(/\\([^\\]*?)$/)
                const name = (result !== null && result.length === 2) ? result[1] : "name"
                let newName = name
                let num = 2
                while (this.determineName(newName)) {
                    newName = `${name}(${num})`
                    num++
                }
                return newName
            },
            determineName(name: string): boolean {
                const index = this.contentFileData.find(value => {
                    return value.name === name
                })
                return index !== undefined
            }
        },
        components: {
            "delete-icon": deleteIcon,
            "add-icon": addIcon
        }
    })
</script>

<style scoped lang="scss">
    .content-files {
        position: absolute;
        left: 5px;
        right: 5px;
        top: 5px;
        bottom: 5px;
    }
</style>
