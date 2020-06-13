<template>
    <div class="history">
        <q-input v-model.lazy="language" label="语言选择"></q-input>
        <my-text :language="language" v-model="value" style="margin-top: 50px"></my-text>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import myText from "@/components/myText.vue";

    export default Vue.extend({
        name: "History",
        data() {
            return {
                value: "",
                language: "javascript"
            }
        },
        components: {
            "my-text": myText
        }
    })
</script>

<style scoped lang="scss">

</style>
