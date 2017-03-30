import CxltHeadTr from './HeadTr'

export default {
    name: 'CxltTableHead',
    data: () => {
        return {
            rows: []
        }
    },
    props: {
        columns: {
            type: Array
        },
        rowIndex: {
            type: Number
        }
    },
    created() {
        this.parseColumns(this.rows, this.columns, 0)
    },
    mounted() {
        console.log(this.rows)
    },
    render: function (createElement) {
        var self = this
        return createElement('thead', [this.rows.map(function (row, index) {
            return createElement(CxltHeadTr, {
                props: {
                    row: row,
                    rows: self.rows
                }
            })
        })])
    },
    components: {
        CxltHeadTr
    },
    methods: {
        parseColumns(rows, columns, rowIndex) {
            let ths = []
            let nextColumns = []
            let row = {}
            columns.forEach(function (column) {
                if (typeof column === 'string') {
                    ths.push({
                        title: column,
                        row: row
                    })
                } else if (typeof column === 'object') {
                    if (column.columns) {
                        Array.prototype.push.apply(nextColumns, column.columns)
                    }
                    column.row = row
                    ths.push(column)
                }
            })

            row.rowIndex = rowIndex
            row.columns = ths
            rows.push(row)
            rowIndex++
            if (nextColumns.length > 0) {
                this.parseColumns(rows, nextColumns, rowIndex)
            }
        }
    }
}
