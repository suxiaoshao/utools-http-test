<template>
    <div class="Text" ref="container">

    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue"
    import {editor} from "monaco-editor";
    import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
    import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
    import "monaco-editor/esm/vs/basic-languages/xml/xml.contribution"

    interface Data {
        editor: IStandaloneCodeEditor | null
    }

    export default Vue.extend({
        name: "myText",
        data(): Data {
            return {
                editor: null
            }
        },
        props: {
            language: String as PropType<string | undefined>,
            value: String as PropType<string>
        },
        mounted() {
            const container = this.$refs.container as HTMLElement
            const theme: string = this.$q.dark.isActive ? "vs-dark" : "vs"
            this.editor = editor.create(container, {
                value: this.value,
                theme: theme,
                language: this.language
            })
            this.editor.onKeyUp(() => {
                this.$emit("update", this.editor!.getValue())
            })
        },
        model: {
            prop: "value",
            event: "update"
        },
        watch: {
            value: {
                immediate: true,
                handler(val: string) {
                    if (this.editor !== null && val !== this.editor.getValue()) {
                        this.editor.setValue(val)
                    }
                }
            },
            language: {
                immediate: true,
                handler(val: string) {
                    if (this.editor !== null) {
                        const model = this.editor.getModel()
                        if (model !== null) {
                            editor.setModelLanguage(model, val)
                        }
                    }
                }
            },
            "$q.dark.isActive": {
                immediate: true,
                handler(val: boolean) {
                    const theme: string = val ? "vs-dark" : "vs"
                    if (this.editor !== null) {
                        editor.setTheme(theme)
                    }
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    .Text {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
