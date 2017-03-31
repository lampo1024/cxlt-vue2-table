import CxltBodyTd from './Td'
// import Vue from 'vue'

export default {
    name: 'CxltBodyTr',
    props: {
        row: {
            type: Object
        },
        index: {
            type: Number
        },
        columns: {
            type: Array
        }
    },
    created() {
        // console.log(this.row)
        // console.log(this.columns)
        // console.log(this.$options)
    },
    components: [
        CxltBodyTd
    ],
    render: function (createElement) {
        let self = this
        return createElement('tr', {}, [
            this.columns.map(function (column) {
                // let item = ''
                // let isRender = false
                // if (column.render && typeof column.render === 'function') {
                //     item = column.render(self.row, self.index)
                //     isRender = true
                // } else {
                //     item = self.row[column.name]
                // }

                return createElement(CxltBodyTd, {
                    props: {
                        row: self.row,
                        item: column
                    }
                    // scopedSlots: {
                    //     default: props => createElement('button', '编辑')
                    // }
                })
            })
        ])
    }
}
