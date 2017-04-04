import CxltBodyTr from './BodyTr'
export default {
    name: 'CxltTableBody',
    props: {
        data: {
            type: Array
        },
        columns: {
            type: Array
        }
    },
    render: function (createElement) {
        let self = this
        return createElement('tbody', [
            this.data.map(function (item, index) {
                item.data = self.data
                item.$index = index
                return createElement(CxltBodyTr, {
                    props: {
                        row: item,
                        columns: self.expandColumns(self.columns)
                    }
                })
            })
        ])
    },
    watch: {
        data: function (newData) {
            // console.log('data changed')
        }
    },
    methods: {
        expandColumns(columns) {
            let newCols = []
            let self = this
            columns.forEach(function (col) {
                let colType = typeof col
                if (colType === 'string') {
                    newCols.push({
                        name: col
                    })
                } else if (colType === 'object') {
                    if (col.columns) {
                        Array.prototype.push.apply(newCols, self.expandColumns(col.columns))
                    } else {
                        newCols.push(col)
                    }
                }
            })
            return newCols
        }
    }
}
