import Table from './Table'
import Pagination from './Pagination'
import TableLimit from './TableLimit'

const CxltTable = {
    install: function (Vue) {
        Vue.component(Table.name, Table)
        Vue.component(Pagination.name, Pagination)
        Vue.component(TableLimit.name, TableLimit)
    }
}

export default CxltTable
