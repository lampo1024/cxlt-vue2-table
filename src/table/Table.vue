<template>
    <table>
        <thead>
            <tr>
                <th v-for="c in columns">
                    {{c.title?c.title:c.name?c.name:c}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in data">
                <td>
                    {{d.id}}
                </td>
                <td>
                    {{d.name}}
                </td>
            </tr>
        </tbody>
    </table>
</template>


<script>

export default {
    name: 'CxltTable',
    props: ['data', 'columns'],
    mounted() {
        console.log(this.columns)
    }
}

</script>
