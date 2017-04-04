<template>
    <table>
        <caption v-if="caption">{{caption}}</caption>
        <cxlt-table-head v-if="showHeader"
                         :columns="columns"></cxlt-table-head>
        <cxlt-table-body :data="data"
                         :columns="columns"></cxlt-table-body>
        <cxlt-table-footer></cxlt-table-footer>
    </table>
</template>

<script>

import utils from './utils'
import CxltTableHead from './TableHead'
import CxltTableBody from './TableBody'
import CxltTableFooter from './TableFooter'
import { EventBus } from './EventBus'

export default {
    name: 'CxltTable',
    props: {
        data: {
            type: Array
        },
        caption: {
            type: String
        },
        columns: {
            type: Array
        },
        showHeader: {
            type: Boolean,
            default: true
        }
    },
    created() {
        EventBus.$on('sort', (column, sortType) => {
            this.$emit('sort', column, sortType)
        })
    },
    methods: {
        parseColumnTitle: utils.parseColumnTitle
    },
    components: {
        CxltTableHead,
        CxltTableBody,
        CxltTableFooter
    }
}

</script>
