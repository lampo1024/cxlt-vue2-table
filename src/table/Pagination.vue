<template>
    <ul class="pagination"
        style="visibility: visible;">
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
            pageCount: null,
            currentPage: 0,
            displayItems: []
        }
    },
    props: {
        pagination: {
            type: Object
        },
        maxItemCount: {
            type: Number,
            default: 10
        }
    },
    computed: {
        displayCount() {
            return this.maxItemCount
        },
        prevDisabled() {
            return this.currentPage <= 0
        },
        nextDisabled() {
            return this.currentPage >= this.pageCount - 1
        },
        total() {
            return this.pagination.total
        }
    },
    created() {
        this.pageCount = this.getPageCount()

        if (this.pagination.displayCount) {
            this.displayCount = this.pagination.displayCount
        }
        if (this.pagination.page) {
            this.currentPage = this.pagination.page <= (this.pageCount - 1) ? this.pagination.page : (this.pageCount - 1)
        }

        var displayRange = this.getDisplayRange()
        for (var i = displayRange.from; i <= displayRange.to; i++) {
            this.displayItems.push(i)
        }

        EventBus.$on('change-page', (from, page) => {
            if (this !== from && this.currentPage !== page) {
                this.changePage(page, false)
            }
        })
    },
    watch: {
        total: function (newVal) {
            var pageCount = this.getPageCount()
            if (pageCount !== this.pageCount) {
                this.pageCount = pageCount
                var displayItems = []
                var displayRange = this.getDisplayRange()
                for (var i = displayRange.from; i <= displayRange.to; i++) {
                    displayItems.push(i)
                }
                this.displayItems = displayItems
            }
        }
    },
    methods: {
        changePage(page, emitEvent = true) {
            this.currentPage = page
            this.pageCount = this.getPageCount()
            var displayRange = this.getDisplayRange()
            this.displayItems = []
            for (var i = displayRange.from; i <= displayRange.to; i++) {
                this.displayItems.push(i)
            }
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
    width: 30px;
}

ul.pagination>li.disabled {
    cursor: not-allowed
}
</style>
