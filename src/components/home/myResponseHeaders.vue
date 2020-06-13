<template>
    <div class="response-headers">
        <div class="info">
            <q-input readonly class="item" :value="responseHeadersData.responseStatus" label="status"></q-input>
            <q-input readonly class="item" :value="responseHeadersData.responseTime*1000" label="响应时间"
                     suffix="ms/单位"></q-input>
        </div>
        <div class="headers-info">
            <div class="absolute-full table-father">
                <q-table class="headers-table" separator="cell" :data="responseHeadersData.headers" :columns="columns"
                         :rows-per-page-options="[0]" :pagination.sync="pagination" virtual-scroll/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue"
    import {Column, ResponseHeadersData} from "@/util/interface";

    interface Data {
        columns: Column[],
        pagination: {
            rowsPerPage: number
        }
    }

    export default Vue.extend({
        name: "myResponseHeaders",
        props: {
            responseHeadersData: Object as PropType<ResponseHeadersData>
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
    .response-headers {
        display: flex;
        flex-direction: column;
        height: 100%;

        .headers-info {
            flex: 1 1 auto;
            overflow: auto;
            position: relative;

            .table-father {
                margin: 1px;

                .headers-table {
                    max-height: 100%;
                    padding: 1px;
                }
            }

        }

        .info {
            flex: 0 0 auto;
            display: flex;

            .item {
                flex: 1 1 auto;
            }
        }
    }
</style>
