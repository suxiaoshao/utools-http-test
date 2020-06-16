import Vue from 'vue'
import App from './App.vue'
import router from './util/router'
import './quasar'
import "./styles/app.scss"
import {WebData} from "@/util/webData";
import {WebHistory} from "@/util/webHistory";

Vue.config.productionTip = false

const webData = new WebData()
Vue.prototype.webData = webData

const webHistory = new WebHistory(
    {
        choose: "empty",
        otherContentType: "charset=utf-8",
        contentType: "",
        text: "",
        files: [],
        form: []
    },
    {
        headers: [
            {
                name: "accept",
                value: "*/*"
            },
            {
                name: "cache-control",
                value: "no-cache"
            },
            {
                name: "user-agent",
                value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45"
            }
        ],
        cookies: []
    }, "", "", "GET")
Vue.prototype.webHistory = webHistory
if (window.utools === undefined) {
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
} else {
    window.utools.onPluginReady(() => {
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    })
}
