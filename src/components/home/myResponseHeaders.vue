<template>
    <q-table separator="cell" :data="responseHeadersData" :columns="columns"
             row-key="name" :rows-per-page-options="[0]" :pagination.sync="pagination" virtual-scroll
             style="max-height: 100%"/>
</template>

<script lang="ts">
    import Vue from "vue"
    import {Column, Header} from "@/util/interface";

    interface Data {
        columns: Column[],
        pagination: {
            rowsPerPage: number
        }
    }

    export default Vue.extend({
        name: "myResponseHeaders",
        props: {
            responseHeadersData: Array as () => Header[]
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
                ],
                pagination: {
                    rowsPerPage: 0
                }
            }
        }
    })
</script>

<style scoped lang="scss">

</style>
