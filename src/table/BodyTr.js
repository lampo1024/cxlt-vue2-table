import CxltBodyTd from './Td'

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
    },
    components: [
        CxltBodyTd
    ],
    render: function (createElement) {
        let self = this
        return createElement('tr', {}, [
            this.columns.map(function (column) {
                let item = ''
                if (column.render && typeof column.render === 'function') {
                    item = column.render(self.row, self.index)
                } else {
                    item = self.row[column.name]
                }

                return createElement(CxltBodyTd, {
                    props: {
                        item: item
                    }
                })
            })
        ])
    }
}
