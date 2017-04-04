import { EventBus } from './EventBus'
export default {
    name: 'CxltHeadTh',
    data: () => {
        return {
            // sort type : 0 default 1 asc 2 descs
            sortType: null
        }
    },
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

        let ons = {}

        if (this.column.sortable) {
            attrs.class = 'sorting'
            ons.click = this.sort
        }

        return createElement('th', {
            attrs: attrs,
            on: ons
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
            let sum = 0
            if (!columns) {
                return 1
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
        },
        sort() {
            this.sortType = (++this.sortType) % 3
            console.log(this.sortType)
            EventBus.$emit('sort', this.column.name, this.sortType)
        }
    }
}
