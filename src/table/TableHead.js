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
    mounted() {
        this.parseColumns(this.rows, this.columns, 0)
        console.log(this.rows)
    },
    render: function (createElement) {
        var self = this
        return createElement('thead', [this.rows.map(function (row, index) {
            return createElement(CxltHeadTr, {
                props: {
                    row: row,
                    rowCount: self.rows.length,
                    rowIndex: index
                }
            })
        })])
    },
    components: {
        CxltHeadTr
    },
    methods: {
        parseColumns(rows, columns, level) {
            let ths = []
            let nextColumns = []
            for (var i = 0; i < columns.length; i++) {
                ths.push(columns[i])
                if (columns[i].columns) {
                    Array.prototype.push.apply(nextColumns, columns[i].columns)
                }
            }
            rows.push({
                level: level,
                columns: ths
            })
            level++
            if (nextColumns.length > 0) {
                this.parseColumns(rows, nextColumns, level)
            }
        }
    }
}
