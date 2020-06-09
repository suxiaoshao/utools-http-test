<template>
    <div class="content-xml" ref="container"></div>
</template>

<script lang="ts">
    import Vue from "vue"
    import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
    import {editor} from "monaco-editor/esm/vs/editor/editor.api";
    import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
    import "monaco-editor/esm/vs/basic-languages/xml/xml.contribution"

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
                language: "xml"
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
                        value: val,
                        theme: theme,
                        language: "xml"
                    })
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    .content-xml {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
