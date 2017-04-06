<template>
    <ul class="pagination">
        <li>
            <a @click.prevent="firstPage">
                <i class="fa fa-angle-double-left"></i></a>
        </li>
        <li :class="{disabled:prevDisabled}">
            <a @click.prevent="prevPage">
                <i class="fa fa-angle-left"></i></a>
        </li>
        <li v-for="i in displayItems"
            :class="{active:currentPage==i}">
            <a @click.prevent="changePage(i)">{{i+1}}</a>
        </li>
        <li :class="{disabled:nextDisabled}">
            <a @click.prevent="nextPage"><i class="fa fa-angle-right"></i></a>
        </li>
        <li>
            <a @click.prevent="lastPage"><i class="fa fa-angle-double-right"></i></a>
        </li>
    </ul>
</template>

<script>

import { EventBus } from './EventBus'

export default {
    name: 'CxltPagination',
    data: () => {
        return {
            privateCurrentPage: 0,
            pageCount: 0,
            displayItems: []
        }
    },
    props: {
        pagination: {
            type: Object,
            default: {
                total: 0,
                limit: 10,
                page: 0
            }
        },
        maxItemCount: {
            type: Number,
            default: 10
        }
    },
    computed: {
        total: function () {
            return this.pagination.total
        },
        limit: function () {
            return this.pagination.limit
        },
        displayCount: function () {
            return this.maxItemCount
        },
        prevDisabled: function () {
            return this.currentPage <= 0
        },
        nextDisabled: function () {
            return this.currentPage >= this.pageCount - 1
        },
        currentPage: {
            get: function () {
                return this.privateCurrentPage
            },
            set: function (val) {
                if (val > this.pageCount - 1) {
                    this.privateCurrentPage = this.pageCount - 1
                } else {
                    this.privateCurrentPage = val
                }
            }
        }
    },
    created() {
        if (this.pagination.page) {
            this.currentPage = this.pagination.page
        }

        this.pageCount = this.getPageCount()

        this.displayItems = this.getDisplayItems()

        EventBus.$on('change-page', (from, page) => {
            if (this !== from && this.currentPage !== page) {
                this.changePage(page, false)
            }
        })
    },
    beforeDestroy() {
        EventBus.$off('change-page')
    },
    watch: {
        total: function (newVal) {
            this.pageCount = this.getPageCount()
            this.displayItems = this.getDisplayItems()
            this.currentPage = this.currentPage
        },
        limit: function (newVal) {
            this.pageCount = this.getPageCount()
            this.displayItems = this.getDisplayItems()
            this.currentPage = this.currentPage
        }
    },
    methods: {
        changePage(page, emitEvent = true) {
            this.currentPage = page
            if (emitEvent) {
                this.$emit('change-page', page)
                EventBus.$emit('change-page', this, page)
            }
        },
        prevPage() {
            if (this.currentPage - 1 >= 0) {
                --this.currentPage
                this.changePage(this.currentPage)
            }
        },
        nextPage() {
            if (this.currentPage + 1 <= this.pageCount - 1) {
                ++this.currentPage
                this.changePage(this.currentPage)
            }
        },
        firstPage() {
            this.changePage(0)
        },
        lastPage() {
            this.changePage(this.pageCount - 1)
        },
        getPageCount() {
            if (this.pagination.total && this.pagination.limit) {
                if (this.pagination.limit === 0) {
                    return 0
                }
                return Math.ceil(this.pagination.total * 1.0 / this.pagination.limit)
            } else {
                return 0
            }
        },
        getDisplayRange() {
            if (this.pageCount <= this.displayCount) {
                return {
                    from: 0,
                    // 索引从0开始
                    to: this.pageCount - 1
                }
            } else {
                var halfDisplayCount = Math.floor(this.displayCount / 2)

                var chp = this.currentPage + halfDisplayCount

                var chm = this.currentPage - halfDisplayCount
                if (chm < 0) {
                    return {
                        from: 0,
                        to: this.displayCount - 1
                    }
                } else {
                    var to = Math.min(chp, this.pageCount - 1)
                    return {
                        from: to - (this.displayCount - 1),
                        to: to
                    }
                }
            }
        },
        getDisplayItems() {
            var displayItems = []
            var displayRange = this.getDisplayRange()
            for (var i = displayRange.from; i <= displayRange.to; i++) {
                displayItems.push(i)
            }
            return displayItems
        }
    }
}

</script>

<style>
ul.pagination {
    list-style: none;
}

ul.pagination>li {
    float: left;
}

ul.pagination>li.disabled {
    cursor: not-allowed
}
</style>
