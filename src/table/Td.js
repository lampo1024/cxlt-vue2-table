
export default {
    name: 'CxltBodyTd',
    props: ['item', 'row'],
    render: function (createElement) {
        if (typeof this.item === 'object') {
            if (this.item.render && typeof this.item.render === 'function') {
                return createElement('td', [
                    this.item.render(this.tdValue, this.row, createElement)
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
                    return createElement('td', {
                        domProps: {
                            innerHTML: this.tdValue
                        }
                    })
                }
            }
        }
    },
    computed: {
        tdValue() {
            var names = this.item.name.split('.')
            var val = this.row[names[0]]
            for (var i = 1; i < names.length; i++) {
                val = val[names[i]]
            }
            return val
        }
    }
}
