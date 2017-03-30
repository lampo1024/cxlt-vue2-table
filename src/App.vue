<template>
    <div>
        <cxlt-table :data="data"
                    :columns="columns"
                    :caption="caption"
                    :show-header="showHeader"
                    class="table">
            <cxlt-table-column slot="thead"></cxlt-table-column>
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
                    name: 'Bob',
                    age: 20,
                    province: '山东',
                    city: '青岛'
                },
                {
                    id: 2,
                    name: 'Tom',
                    age: 21,
                    province: '山东',
                    city: '济南'
                },
                {
                    id: 3,
                    name: 'Lucy',
                    age: 22,
                    province: '山东',
                    city: '威海'
                }
            ],
            columns: ['id',
                {
                    title: '用户信息',
                    columns: [
                        {
                            name: 'name',
                            title: '名称'
                        }, {
                            name: 'age',
                            title: '年龄'
                        }, {
                            title: '地址信息',
                            columns: [
                                {
                                    name: 'province',
                                    title: '省'
                                }, {
                                    name: 'city',
                                    title: '市'
                                }
                            ]
                        }
                    ]
                }],
            caption: '演示表格',
            showHeader: true
        }
    }
}

</script>

<style>
.table {
    width: 300px;
    border: 1px solid #000;
}

.table th {
    vertical-align: top;
    text-align: center;
    align-content: center
}
</style>
