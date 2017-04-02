<template>
    <ul class="pagination"
        style="visibility: visible;">
<!--<li class="prev disabled"><a href="#"
            title="First"><i class="fa fa-angle-double-left"></i></a></li>
    <li class="prev disabled"><a href="#"
            title="Prev"><i class="fa fa-angle-left"></i></a></li>
    <li class="active"><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
    <li class="next"><a href="#"
            title="Next"><i class="fa fa-angle-right"></i></a></li>
    <li class="next"><a href="#"
            title="Last"><i class="fa fa-angle-double-right"></i></a></li>
-->
        <li :disabled="prevDisabled">
            <a @click="prevPage">
                <</a>
        </li>
        <li v-for="i in displayItems">
            <a href="#"
               @click="changePage(i)"
               :class="{active:currentPage==i}">{{i+1}}</a>
        </li>
    </ul>
</template>

<script>
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
            if (this.currentPage <= 0) {
                return 'disabled'
            }
            return ''
        },
        nextDisabled() {

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
    },
    methods: {
        changePage(page) {
            this.currentPage = page
            this.pageCount = this.getPageCount()
            var displayRange = this.getDisplayRange()
            this.displayItems = []
            for (var i = displayRange.from; i <= displayRange.to; i++) {
                this.displayItems.push(i)
            }
            this.$emit('change-page', page)
        },
        prevPage() {
            this.changePage(--this.currentPage < 0 ? 0 : this.currentPage)
        },
        nextPage() {

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
                // console.log(halfDisplayCount)

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

ul.pagination>li a.active {
    color: red;
}
</style>
