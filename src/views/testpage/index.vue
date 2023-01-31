<template>
    <div class="app-container">
        <CTable v-model="tableData" @indexchange="handleSizeChange" @pageSizechange="">
            <el-table-column fixed prop="date" label="日期" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="province" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </CTable>
    </div>
</template>

<script>
// import Ctable from '@/components/Ctable/index.vue'

export default {
    name: 'TestPage',
    // components: {
    //     Ctable
    // },
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, ]
        }
    },
    methods: {
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style lang="scss" scoped>

</style>