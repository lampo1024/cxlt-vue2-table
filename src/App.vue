<template>
    <div>
        <button @click="addRow">Add Row</button>
        <cxlt-pagination :pagination="pagination"
                         :max-item-count="maxItemCount"
                         @change-page="changePage">
        </cxlt-pagination>
        <cxlt-pagination :pagination="pagination"
                         :max-item-count="maxItemCount"
                         @change-page="changePage">
        </cxlt-pagination>
        <cxlt-table :data="data"
                    :columns="columns"
                    :caption="caption"
                    :show-header="showHeader"
                    @sort="sort"
                    class="table">
        </cxlt-table>
        <cxlt-pagination :pagination="pagination"
                         :max-item-count="maxItemCount"
                         @change-page="changePage">
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
                            title: '名称',
                            sortable: true
                        }, {
                            name: 'age',
                            title: '年龄',
                            sortable: true
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
                    name: 'id',
                    render: (data, row, createElement) => {
                        // return createElement('button', {
                        //     on: {
                        //         click: () => {
                        //             console.log(row.name)
                        //         }
                        //     },
                        //     attrs: {
                        //         class: 'button'
                        //     }
                        // }, '编辑')
                        return createElement('span', [
                            createElement('button', {
                                on: {
                                    click: () => {
                                        console.log('edit-' + row.name)
                                    }
                                },
                                attrs: {
                                    class: 'button'
                                }
                            }, '编辑'),
                            createElement('button', {
                                on: {
                                    click: () => {
                                        console.log('del-' + row.name)
                                    }
                                },
                                attrs: {
                                    class: 'button'
                                }
                            }, '删除')
                        ])
                    }
                }],
            caption: '演示表格',
            showHeader: true,
            pagination: {
                //  记录总数
                total: 0,
                // 每页记录数
                limit: 5,
                // 当前页 从0开始
                page: 0
            },
            maxItemCount: 5,
            text: 'hello'
        }
    },
    created() {
        this.pagination.total = this.data.length
    },
    methods: {
        changePage(page) {
            // console.log(this.$data.pagination)
            console.log(page)
        },
        sort(column, sortType) {
            console.log('App.vue ' + column + ' ' + sortType)
        },
        addRow() {
            this.data.push({
                id: 1,
                name: 'Bob1',
                age: 20,
                province: '山东',
                city: '青岛',
                district: '李沧区',
                address: '南昌路'
            })
            this.pagination.total = this.data.length
            console.log(this.pagination.total)
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
