
export default {
    parseColumnTitle: (column) => {
        let columnType = typeof column
        if (columnType === 'string') {
            return column
        } else if (columnType === 'object') {
            if (column.title) {
                return column.title
            } else {
                return column.name
            }
        } else {
            return null
        }
    }
}
