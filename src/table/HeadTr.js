
import CxltTh from './Th'

export default {
    name: 'CxltHeadTr',
    props: {
        row: {
            type: Object
        },
        rows: {
            type: Array
        }
    },
    render: function (createElement) {
        var self = this
        return createElement('tr', [this.row.columns.map(function (column) {
            return createElement(CxltTh, {
                props: {
                    column: column,
                    rows: self.rows
                }
            })
        })])
    },
    components: {
        CxltTh
    }
}
