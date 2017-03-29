<template>
    <div>
        <cxlt-table :data="data">

        </cxlt-table>
        <cxlt-pagination>
        </cxlt-pagination>
    </div>
</template>

<script>

export default {
    name: 'App',
    data: () => {
        return {
            data: [
                {
                    id: 1,
                    name: 'Bob'
                },
                {
                    id: 2,
                    name: 'Tom'
                },
                {
                    id: 3,
                    name: 'Lucy'
                }
            ]
        }
    }
}

</script>
