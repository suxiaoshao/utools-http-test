<template>
    <div class="content-text" ref="container">
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
    import {editor} from "monaco-editor/esm/vs/editor/editor.api";
    import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

    interface Data {
        editor: IStandaloneCodeEditor | null
    }

    export default Vue.extend({
        name: "contentText",
        props: {
            value: String
        },
        data(): Data {
            return {
                editor: null
            }
        },
        computed: {
            theme(): boolean {
                return this.$q.dark.isActive
            }
        },
        mounted() {
            const container = this.$refs.container as HTMLElement
            const theme: string = this.$q.dark.isActive ? "vs-dark" : "vs"
            this.editor = editor.create(container, {
                value: this.value,
                theme: theme
            })
        },
        beforeUpdate() {
            this.editor!.dispose()
        },
        watch: {
            value: {
                immediate: true,
                handler(val: string) {
                    if (this.editor !== null) {
                        this.editor.setValue(val)
                    }
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    .content-text {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
