<template>
    <div class="app">
        <!-- 侧边边框 -->
        <div class="drawer full-height">
            <my-drawer></my-drawer>
        </div>

        <!-- 路由页面 -->
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import drawer from "@/components/myDrawer.vue";

    export default Vue.extend({
        name: 'LayoutDefault',

        components: {
            "my-drawer": drawer
        }
    })
</script>

<style scoped lang="scss">
    .app {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        .drawer {
            width: 160px;
        }
        .main{
            position: absolute;
            top: 0;
            left: 160px;
            right: 0;
            bottom: 0;
        }
    ;
    }
</style>
