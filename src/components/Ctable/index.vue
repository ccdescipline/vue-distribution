<template>
    <div>
        <el-table v-loading="loading" :data="tabledata.datalist" :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}" size="mini">
            <slot></slot>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" layout="prev, pager, next, jumper, sizes"
                :page-count="tabledata.rowcount">
            </el-pagination>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Ctable',
    model: {
        prop: 'tabledata',
        // 随便命名事件，对应下面$emit即可
        event: 'tabledataChange',

    },
    watch: {
        tabledata: function (newData, oldData) {
            this.$emit('tabledataChange', newData)
        }
    },
    props: {
        tabledata: { Array },
        loading: { Boolean }
    },
    data() {
        return {
            currentPage: 0,

        }
    },
    emits: [
        'indexchange',
        'pageSizechange'
    ],
    methods: {
        handleSizeChange(val) {

            this.$emit('pageSizechange', val)
        },
        handleCurrentChange(val) {

            this.$emit('indexchange', val)
        }
    },
}
</script>

<style lang="scss" scoped>
.pagination-container {
    margin-top: 20px;
}
</style>