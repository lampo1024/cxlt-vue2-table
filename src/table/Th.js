
export default {
    name: 'CxltTh',
    props: {
        column: [String, Object],
        rowCount: {
            type: Number
        },
        rowIndex: {
            type: Number
        }
    },
    render: function (createElement) {
        var attrs = {}
        var rowSpan = this.getRowSpan()
        if (rowSpan > 1) {
            attrs.rowspan = rowSpan
        }
        return createElement('th', {
            attrs: attrs
        }, this.getTitle())
    },
    methods: {
        getTitle() {
            let columnType = typeof this.column
            if (columnType === 'string') {
                return this.column
            } else if (columnType === 'object') {
                return this.column.title
            } else {
                return null
            }
        },
        getRowSpan() {
            if (this.column.columns) {
                return 1
            } else {
                return this.rowCount - this.rowIndex
            }
        }
    }
}
