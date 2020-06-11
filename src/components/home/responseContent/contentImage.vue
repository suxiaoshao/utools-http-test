<template>
    <q-scroll-area class="content-image">
        <q-card class="card">
            <img :src="url" alt="">
        </q-card>
    </q-scroll-area>
</template>

<script lang="ts">
    import Vue from "vue"

    export default Vue.extend({
        name: "contentImage",
        props: {
            value: ArrayBuffer
        },
        computed: {
            url(): string {
                return URL.createObjectURL(new Blob([this.value]))
            }
        }
    })
</script>

<style scoped lang="scss">
    .content-image {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding-top: 2px;

        .card {
            position: relative;
            width: 80%;
            left: 10%;
            img {
                width: 100%
            }
        }
    }
</style>
