<template>
    <label>
        <span v-if="leftLabel">{{leftLabel}}</span>
        <select @change="selectChange"
                v-model="selectedVal">
            <option v-for="l in limits">{{l}}</option>
            <option v-if="showAll"
                    value="0">{{allText}}</option>
        </select>
        <span v-if="rightLabel">{{rightLabel}}</span>
    </label>
</template>

<script>

export default {
    name: 'CxltTableLimit',
    data: () => {
        return {
            selectedVal: null
        }
    },
    props: {
        limits: {
            type: Array,
            default: []
        },
        leftLabel: [String],
        rightLabel: [String],
        showAll: {
            type: Boolean,
            default: true
        },
        allText: {
            type: String,
            default: 'All'
        }
    },
    created() {
        this.selectedVal = this.limits[0]
    },
    methods: {
        selectChange() {
            this.$emit('limit-change', this.selectedVal)
        }
    }
}

</script>
