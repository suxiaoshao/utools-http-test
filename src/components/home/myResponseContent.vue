<template>
    <div class="my-response-content">
        <div class="row absolute-top">
            <q-select v-model="responseContentData.choose" class="col-grow" :options="options" label="显示类型"
                      emit-value></q-select>
            <q-input v-model="responseContentData.charset" class="col-5" label="编码方式" @blur="changeCharset"></q-input>
            <q-input readonly :value="dataLength" class="col-4" label="响应数据大小"
                     suffix="bites/单位"></q-input>
        </div>
        <div class="my-main">
            <q-tab-panels class="fit" v-model="responseContentData.choose" animated>
                <q-tab-panel name="empty">
                </q-tab-panel>

                <q-tab-panel name="text">
                    <my-text :value="responseContentData.text" :read-only="true"></my-text>
                </q-tab-panel>
                <q-tab-panel name="xml">
                    <my-text :value="responseContentData.text" language="xml" :read-only="true"></my-text>
                </q-tab-panel>
                <q-tab-panel name="json">
                    <my-text :value="jsonText" language="json" :read-only="true"></my-text>
                </q-tab-panel>
                <q-tab-panel name="html">
                    <my-text :value="responseContentData.text" language="html" :read-only="true"></my-text>
                </q-tab-panel>
                <q-tab-panel name="image">
                    <my-response-image :value="responseContentData.buffer.buffer"></my-response-image>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue"
  import {ResponseContentData} from "@/util/interface";
  import contentImage from "@/components/home/responseContent/contentImage.vue";
  import myText from "@/components/myText.vue";

  interface OptionItem {
    label: string,
    value: "empty" | "text" | "json" | "xml" | "html" | "image"
  }

  interface Data {
    options: OptionItem[]
  }

  export default Vue.extend({
    name: "myResponse",
    props: {
      responseContentData: Object as PropType<ResponseContentData>
    },
    data(): Data {
      return {
        options: [
          {
            value: "empty",
            label: "空"
          },
          {
            value: "text",
            label: "字符串"
          },
          {
            value: "xml",
            label: "xml"
          },
          {
            value: "json",
            label: "json"
          },
          {
            value: "html",
            label: "html"
          },
          {
            value: "image",
            label: "图片"
          }
        ]
      }
    },
    computed: {
      dataLength(): number {
        return this.responseContentData.buffer.buffer.byteLength
      },
      jsonText(): string {
        try {
          return JSON.stringify(JSON.parse(this.responseContentData.text))
        } catch (e) {
          return this.responseContentData.text
        }
      }
    },
    components: {
      "my-response-image": contentImage,
      "my-text": myText
    },
    methods: {
      changeCharset() {
        this.webData.setResponseDataText()
      }
    },
  })
</script>

<style scoped lang="scss">
    .my-response-content {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 10px;

        .my-main {
            position: absolute;
            top: 56px;
            bottom: 0;
            right: 0;
            left: 0;
        }
    }
</style>
