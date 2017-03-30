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
                    city: '青岛',
                    district: '李沧区',
                    address: '南昌路'
                },
                {
                    id: 2,
                    name: 'Tom',
                    age: 21,
                    province: '山东',
                    city: '青岛',
                    district: '市北区',
                    address: '长沙路'
                },
                {
                    id: 3,
                    name: 'Lucy',
                    age: 22,
                    province: '山东',
                    city: '青岛',
                    district: '市南区',
                    address: '五四广场'
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
                                }, {
                                    title: '详细地址',
                                    columns: [
                                        {
                                            name: 'district',
                                            title: '区'
                                        }, {
                                            name: 'address',
                                            title: '街道'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }, {
                    title: '操作',
                    render: function (row, index) {
                        let tpl = '<button @click="click">编辑</button>'
                        return tpl
                    }
                }],
            caption: '演示表格',
            showHeader: true
        }
    },
    methods: {
        click() {
            console.log('click')
        }
    }
}

</script>

<style>
.table {
    width: 500px;
    border: 1px solid #000;
    border-collapse: collapse;
}

.table th {
    text-align: center;
    border: 1px solid #000;
}

.table td {
    border: 1px solid #000
}
</style>
