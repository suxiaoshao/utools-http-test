import Vue from 'vue'
import App from './App.vue'
import router from './util/router'
import './quasar'
import "./styles/app.scss"
import WebData from "@/util/data";

const webData = new WebData()
Vue.config.productionTip = false
Vue.prototype.webData = webData
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
