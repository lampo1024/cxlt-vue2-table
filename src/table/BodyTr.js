import CxltBodyTd from './Td'
// import Vue from 'vue'

export default {
    name: 'CxltBodyTr',
    props: {
        row: {
            type: Object
        },
        columns: {
            type: Array
        }
    },
    components: [
        CxltBodyTd
    ],
    render: function (createElement) {
        let self = this
        return createElement('tr', {}, [
            this.columns.map(function (column) {
                return createElement(CxltBodyTd, {
                    props: {
                        row: self.row,
                        item: column
                    }
                })
            })
        ])
    }
}
