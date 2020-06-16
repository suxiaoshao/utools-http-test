<template>
    <div class="my-drawer fit">

        <!-- 路由导航 -->
        <q-scroll-area class="my-scroll">
            <q-list padding class="menu-list">
                <q-item :active="activeRouter.name===location.name" :key="index" clickable v-ripple
                        v-for="({name,icon,location},index) in routerList" @click="goToRouter(location)">
                    <q-item-section avatar>
                        <q-icon :name="icon"/>
                    </q-item-section>
                    <q-item-section>
                        {{name}}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>

        <!-- 控制 -->
        <div class="theme">
            <!-- 主题控制 -->
            <q-toggle v-model="darkState.isNotDark" checked-icon="gps_not_fixed" unchecked-icon="nights_stay"
                      :label="miniState===false?darkState.themeName:''" color="amber-6"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import {Location} from "vue-router";

    // 路由数据
    interface MyRouterData extends Location {
        name: string
    }

    // 页面数据
    interface MyPageData {
        //路由数据
        location: MyRouterData
        // 图标字符串
        icon: string
        // 路由显示名字
        name: string
    }

    interface MyDrawerData {
        // 页面列表
        routerList: MyPageData[],
        //主题数据
        darkState: {
            //是否不是暗色主题
            isNotDark: boolean
            //主题名字
            themeName: string
        },
        miniState: boolean
    }

    export default Vue.extend({
        name: "myDrawer",
        data(): MyDrawerData {
            return {
                routerList: [
                    {
                        name: "工作区",
                        icon: "network_check",
                        location: {
                            name: "Home"
                        }
                    },
                    {
                        name: "历史记录",
                        icon: "history",
                        location: {
                            name: "history"
                        }
                    }
                ],
                darkState: {
                    isNotDark: true,
                    themeName: "浅色"
                },
                miniState: true
            }
        },
        computed: {
            //当前页面路由
            activeRouter(): MyRouterData {
                return {
                    name: (this.$route.name !== null && this.$route.name !== undefined) ? this.$route.name : ""
                }
            }
        },
        methods: {
            goToRouter(location: MyRouterData) {
                this.$router.push(location)
            }
        },
        watch: {
            "darkState.isNotDark"(oldData, newData) {
                if (newData === true) {
                    this.$q.dark.set(true)
                    this.darkState.themeName = "深色"
                } else {
                    this.$q.dark.set(false)
                    this.darkState.themeName = "浅色"
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    .my-scroll {
        height: 92%;
    }

    .theme {
        text-align: center;
    }
</style>
