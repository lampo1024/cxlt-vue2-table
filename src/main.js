import Vue from 'vue'
import App from './App'
import CxltVueTable from './table'

Vue.use(CxltVueTable)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
