<template>
    <div class="content-html" ref="container"></div>
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
        name: "contentJson",
        props: {
            value: String as () => string
        },
        data(): Data {
            return {
                editor: null
            }
        },
        mounted() {
            const container = this.$refs.container as HTMLElement
            const theme: string = this.$q.dark.isActive ? "vs-dark" : "vs"
            this.editor = editor.create(container, {
                value: this.value,
                theme: theme,
                language: "html"
            })
        },
        beforeUpdate() {
            this.editor!.dispose()
        },
        watch: {
            value: {
                immediate: true,
                handler(val: string) {
                    this.editor!.dispose()
                    const container = this.$refs.container as HTMLElement
                    const theme: string = this.$q.dark.isActive ? "vs-dark" : "vs"
                    this.editor = editor.create(container, {
                        value: this.value,
                        theme: theme,
                        language: "html"
                    })
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    .content-html {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
