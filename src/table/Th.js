
export default {
    name: 'CxltTh',
    props: {
        column: {
            type: Object
        },
        rows: {
            type: Array
        }
    },
    render: function (createElement) {
        let attrs = {}
        let rowSpan = this.getRowSpan()
        let colSpan = this.getColSpan(this.column.columns)
        if (rowSpan > 1) {
            attrs.rowspan = rowSpan
        }
        if (colSpan > 1) {
            attrs.colspan = colSpan
        }

        return createElement('th', {
            attrs: attrs
        }, this.column.title)
    },
    methods: {
        getRowSpan() {
            if (this.column.columns) {
                return 1
            } else {
                return this.rows.length - this.column.row.rowIndex
            }
        },
        getColSpan(columns) {
            let sum = 1
            if (!columns) {
                return sum
            }
            var self = this
            columns.forEach(function (col) {
                if (col.columns) {
                    sum += self.getColSpan(col.columns)
                } else {
                    sum++
                }
            })
            return sum
        }
    }
}
