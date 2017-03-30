// import Vue from 'vue'
export default {
    name: 'CxltBodyTd',
    props: ['item'],
    render: function (createElement) {
        return createElement('td', this.item)
    }
}
