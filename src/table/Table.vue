<template>
    <table>
        <caption v-if="caption">{{caption}}</caption>
        <!--<thead v-if="showHeader">
                            <tr>
                                <th v-for="c in columns">
                                    {{parseColumnTitle(c)}}
                                </th>
                            </tr>
                        </thead>-->
        <cxlt-table-head :columns="columns"></cxlt-table-head>
        <tbody></tbody>
    </table>
</template>

<script>

import utils from './utils'
import CxltTableHead from './TableHead'

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
    mounted() {
        console.log(this)
    },
    methods: {
        parseColumnTitle: utils.parseColumnTitle
    },
    components: {
        CxltTableHead
    }
}

</script>
