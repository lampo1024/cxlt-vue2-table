<template>
    <div>
        <button @click="addRow">Add Row</button>
        <!--<cxlt-pagination :pagination="pagination"
                                                         :max-item-count="maxItemCount"
                                                         @change-page="changePage">
                                        </cxlt-pagination>-->
        <cxlt-table :data="data"
                    :columns="columns"
                    :caption="caption"
                    :show-header="showHeader"
                    @sort="sort"
                    class="table">
        </cxlt-table>
        <!--<cxlt-pagination :pagination="pagination"
                                                         :max-item-count="maxItemCount"
                                                         @change-page="changePage">
                                        </cxlt-pagination>-->
        <cxlt-table-limit :limits="limits"
                          @limit-change="limitChange"
                          :left-label="'每页显示'"
                          :right-label="'条'"
                          :show-all="true"
                          :all-text="'全部'"
                          :all-value="-1"></cxlt-table-limit>
        <cxlt-table :data="brands"
                    :columns="brandColumns"
                    class="table">
        </cxlt-table>
        <cxlt-pagination :pagination="brandPagination"
                         :max-item-count="20"
                         @change-page="brandChangePage">
        </cxlt-pagination>
    </div>
</template>

<script>
import axios from 'axios'
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
                    address: '南昌路',
                    enable: true
                },
                {
                    id: 2,
                    name: 'Tom',
                    age: 21,
                    province: '山东',
                    city: '青岛',
                    district: '市北区',
                    address: '长沙路',
                    enable: false
                },
                {
                    id: 3,
                    name: 'Lucy',
                    age: 22,
                    province: '山东',
                    city: '青岛',
                    district: '市南区',
                    address: '五四广场',
                    enable: true
                }
            ],
            limits: [
                10,
                15,
                20,
                30,
                50
            ],
            brands: [],
            brandColumns: null,
            columns: null,
            caption: '演示表格',
            showHeader: true,
            brandPagination: {
                total: 0,
                limit: 0,
                page: 0
            },
            pagination: {
                //  记录总数
                total: 0,
                // 每页记录数
                limit: 5,
                // 当前页 从0开始
                page: 0
            },
            maxItemCount: 5
        }
    },
    created() {
        axios.get('http://114.215.118.183:8077/api/brands/pagination')
            .then(res => {
                if (res.data.code === 0) {
                    this.brands = res.data.data.data
                    this.brandPagination.total = res.data.data.pagination.itemCount
                    this.brandPagination.limit = res.data.data.pagination.limit
                }
            })

        this.columns = ['id', {
            name: 'enable',
            title: '启用'
        },
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
                        name: 'enable',
                        title: '启用'
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
                render: (value, row, createElement) => {
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
                                    this.data.pop()
                                    console.log(this)
                                }
                            },
                            attrs: {
                                class: 'button'
                            }
                        }, '删除')
                    ])
                }
            }]

        this.brandColumns = [{
            name: '$index',
            title: '序号',
            filter: (row) => {
                return row.$index + 1
            }
        },
            'id',
        {
            name: 'name',
            title: '品牌',
            filter: (row) => {
                return '<strong>' + row.name + '</strong>'
            }
        }, {
            name: 'pinYin',
            title: '拼音'
        }, {
            name: 'bFirstLetter',
            title: '首字母'
        }
        ]

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
            // this.data.push({
            //     id: 1,
            //     name: 'Bob1',
            //     age: 20,
            //     province: '山东',
            //     city: '青岛',
            //     district: '李沧区',
            //     address: '南昌路'
            // })
            // this.pagination.total = this.data.length

            this.brandPagination.total = this.brandPagination.total - 1
        },
        brandChangePage(page) {
            var start = this.brandPagination.limit * page
            axios.get('http://114.215.118.183:8077/api/brands/pagination?start=' + start + '&limit=' + this.brandPagination.limit)
                .then(res => {
                    if (res.data.code === 0) {
                        this.brands = res.data.data.data
                        this.brandPagination.total = res.data.data.pagination.itemCount
                    }
                })
        },
        limitChange(newLimit) {
            axios.get('http://114.215.118.183:8077/api/brands/pagination?limit=' + newLimit)
                .then(res => {
                    if (res.data.code === 0) {
                        this.brands = res.data.data.data
                        this.brandPagination.total = res.data.data.pagination.itemCount
                        this.brandPagination.limit = newLimit
                    }
                })
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
