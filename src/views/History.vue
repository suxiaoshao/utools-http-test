<template>
    <q-scroll-area class="history">
        <div class="row">
            <div class="col-4 col-md-3 col-lg-2" v-for="(item,index) in historyList" :key="index">
                <q-card class="my-card" flat bordered>
                    <q-card-section>
                        <div class="text-h5 text-center">{{item._id}}</div>
                        <q-tooltip>
                            <div class="text-subtitle2">host : {{item.data.host}}</div>
                            <div class="text-subtitle2">path : {{item.data.path}}</div>
                            <div class="text-subtitle2">method : {{item.data.method}}</div>
                        </q-tooltip>
                    </q-card-section>
                    <q-card-actions class="my-action" align="around">
                        <q-btn @click="readHistory(index)" flat round>
                            <import-icon></import-icon>
                            <q-tooltip>读取到工作区</q-tooltip>
                        </q-btn>
                        <q-btn @click="deleteHistory(index)" flat round>
                            <delete-icon></delete-icon>
                            <q-tooltip>删除此历史</q-tooltip>
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-scroll-area>
</template>

<script lang="ts">
    import Vue from "vue"
    import {HistoryItem} from "@/util/interface";
    import {DBItem} from "utools-helper/@types/utools";
    import {Notify} from "quasar";
    import deleteIcon from "@/components/icon/deleteIcon.vue";
    import importIcon from "@/components/icon/importIcon.vue";

    interface Data {
        historyList: DBItem<HistoryItem>[]
    }

    export default Vue.extend({
        name: "History",
        data(): Data {
            return {
                historyList: []
            }
        },
        methods: {
            deleteHistory(index: number): void {
                const name = this.historyList[index]._id
                const result = window.utools.db.remove<HistoryItem>(name)
                if (result.ok) {
                    this.historyList = window.utools.db.allDocs<HistoryItem>()
                } else {
                    Notify.create({
                        message: "删除失败",
                        color: "red-5",
                        position: "top",
                        caption: result.error.toString()
                    })
                    this.historyList = window.utools.db.allDocs<HistoryItem>()
                }
            },
            readHistory(index: number) {
                const thisHistory = this.historyList[index].data
                this.webData.readFromWebHistory(thisHistory)
                this.webHistory.readFromHistoryItem(thisHistory)
                this.$router.push({name: "Home"})
            }
        },
        mounted() {
            this.historyList = window.utools.db.allDocs<HistoryItem>()
        },
        components: {
            "delete-icon": deleteIcon,
            "import-icon": importIcon
        }
    })
</script>

<style scoped lang="scss">
    .history {
        height: 100%;

        .my-card {
            margin: 2px;
        }
    }
</style>
