import Table from './Table'
import Pagination from './Pagination'

const CxltTable = {
    install: function (Vue) {
        Vue.component(Table.name, Table)
        Vue.component(Pagination.name, Pagination)
    }
}

export default CxltTable
