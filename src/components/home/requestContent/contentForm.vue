<template>
    <div class="content-form">
        <q-table :data="formData" :columns="columns" separator="cell" row-key="name" :pagination.sync="pagination"
                 :rows-per-page-options="[0]" virtual-scroll style="max-height: 100%">
            <template v-slot:top>
                <q-btn flat @click="addForm" round>
                    <add-icon></add-icon>
                </q-btn>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">

                    <!-- name列 -->
                    <q-td key="name" :props="props">
                        {{props.row.name}}
                        <q-popup-edit title="name" v-model.lazy="props.row.name" buttons label-set="保存"
                                      label-cancel="取消">
                            <q-input v-model.lazy="props.row.name" dense autofocus></q-input>
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
                        <q-btn flat @click="deleteForm(props.rowIndex)" round>
                            <delete-icon></delete-icon>
                        </q-btn>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import {Column, RequestFormData} from "@/util/interface";
    import addIcon from "@/components/icon/addIcon.vue";
    import deleteIcon from "@/components/icon/deleteIcon.vue";

    interface Data {
        columns: Column[]
        pagination: {
            rowsPerPage: number
        }
    }

    export default Vue.extend({
        name: "contentForm",
        props: {
            formData: Array as () => RequestFormData[]
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
                pagination: {
                    rowsPerPage: 0
                }
            }
        },
        methods: {
            addForm() {
                this.formData.push({name: "", value: ""})
            },
            deleteForm(index: number) {
                this.formData.splice(index, 1)
            }
        },
        components: {
            "add-icon": addIcon,
            "delete-icon": deleteIcon
        }
    })
</script>

<style scoped lang="scss">
    .content-form {
        position: absolute;
        left: 5px;
        right: 5px;
        top: 5px;
        bottom: 5px;
    }
</style>
