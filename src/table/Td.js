
export default {
    name: 'CxltBodyTd',
    props: ['item', 'row'],
    render: function (createElement) {
        if (typeof this.item === 'string') {
            return createElement('td', this.row[this.item])
        } else if (typeof this.item === 'object') {
            if (this.item.render) {
                return createElement('td', [
                    this.item.render(this.row[this.item.name], this.row, createElement)
                ])
                // console.log(this.$slots)
                // return createElement('td', this.$slots.default)
            } else {
                return createElement('td', this.row[this.item.name])
            }
        }
    }
}
