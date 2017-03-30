
import CxltTh from './Th'

export default {
    name: 'CxltHeadTr',
    props: {
        row: {
            type: Object
        },
        rowCount: {
            type: Number
        },
        rowIndex: {
            type: Number
        }
    },
    render: function (createElement) {
        var self = this
        return createElement('tr', [this.row.columns.map(function (column) {
            return createElement(CxltTh, {
                props: {
                    column: column,
                    rowCount: self.rowCount,
                    rowIndex: self.rowIndex
                }
            })
        })])
    },
    components: {
        CxltTh
    }
}
