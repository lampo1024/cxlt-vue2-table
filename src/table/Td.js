
export default {
    name: 'CxltBodyTd',
    props: ['item', 'row'],
    render: function (createElement) {
        if (typeof this.item === 'string') {
            if (this.item === '$index') {
                return createElement('td', this.row.$index)
            } else {
                return createElement('td', this.row[this.item])
            }
        } else if (typeof this.item === 'object') {
            if (this.item.render && typeof this.item.render === 'function') {
                return createElement('td', [
                    this.item.render(this.row[this.item.name], this.row, createElement)
                ])
            } else if (this.item.filter && typeof this.item.filter === 'function') {
                return createElement('td', {
                    domProps: {
                        innerHTML: this.item.filter(this.row)
                    }
                })
            } else {
                if (this.item.name === '$index') {
                    return createElement('td', this.row.$index)
                } else {
                    return createElement('td', this.row[this.item.name])
                }
            }
        }
    }
}
