<template>
    <div>
        <div class="searchform">
            <el-form :inline="true" size="small" style="width: 80%;">
                <el-form-item label="商品名称:">
                    <el-input v-model="querygoodsifnoDto.goodsname" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="品名:">
                    <GoodsTypeSelect v-model="querygoodsifnoDto.goodstype"></GoodsTypeSelect>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="querygoodsifnoDto.status" placeholder="商品状态">
                        <el-option label="上架" :value="1">上架</el-option>
                        <el-option label="下架" :value="0">下架</el-option>
                        <el-option label="弃用" :value="-1">弃用</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="getGoodsinfo">搜索</el-button>
                    <el-switch v-model="issearchdetail" active-color="#13ce66" inactive-color="#ff4949"
                        active-text="详细搜索" style="margin-left: 20px;"></el-switch>
                </el-form-item>



            </el-form>
            <transition enter-active-class="animate__animated animate__fadeInDown">
                <el-form :inline="true" size="small" v-if="issearchdetail">
                    <el-form-item label="价格:">
                        <el-input v-model="querygoodsifnoDto.startprice" placeholder="最低价"
                            style="width: 100px;"></el-input>
                        <span style="margin: 0 10px;">-</span>
                        <el-input v-model="querygoodsifnoDto.endprice" placeholder="最高价"
                            style="width: 100px;"></el-input>
                    </el-form-item>
                    <el-form-item label="起始日期">
                        <el-date-picker v-model="querygoodsifnoDto.starttime" type="datetime" placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期">
                        <el-date-picker v-model="querygoodsifnoDto.endtime" type="datetime" placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </transition>
        </div>


        <CTable v-model="datatable" :loading="loading" @indexchange="handleCurrentChange"
            @pageSizechange="handleSizeChange">
            <el-table-column fixed prop="goodsname" label="商品名称">
                <template slot-scope="scope">
                    <div v-if="!scope.row.isupdate">
                        {{ scope.row.goodsname }}
                    </div>
                    <div v-else>
                        <el-input v-model="scope.row.goodsname" placeholder="商品名称" size="small"
                            style="width: 80%;text-align:center"></el-input>
                    </div>
                </template>

            </el-table-column>
            <el-table-column fixed prop="goodstypename" label="品名">
                <template slot-scope="scope">
                    <div v-if="!scope.row.isupdate">
                        {{ scope.row.goodstypename }}
                    </div>
                    <div v-else>
                        <GoodsTypeSelect v-model="scope.row.goodstype"
                            @changelabel="(label) => { scope.row.goodstypename = label }"></GoodsTypeSelect>
                    </div>

                </template>
            </el-table-column>
            <el-table-column fixed prop="goodsprice" label="单价">
                <template slot-scope="scope">
                    <div v-if="!scope.row.isupdate">
                        <div style="text-align: left;">
                            <el-tag> {{ scope.row.goodsprice }}元</el-tag>
                            / {{ scope.row.goodspackage }}
                        </div>

                    </div>
                    <div v-else>
                        <el-input v-model="scope.row.goodsprice" placeholder="商品单价" size="small"
                            style="width:40%;"></el-input>
                        元 /
                        <el-input v-model="scope.row.goodspackage" placeholder="商品包装" size="small"
                            style="width:40%;"></el-input>
                    </div>


                </template>
            </el-table-column>
            <el-table-column fixed prop="updatetime" label="更新时间">

            </el-table-column>
            <el-table-column fixed prop="companyname" label="供应商">

            </el-table-column>
            <el-table-column fixed prop="count" label="商品数量">
                <template slot-scope="scope">
                    <div style="text-align: left;">
                        <el-tag>{{ scope.row.count }}</el-tag>
                        *{{ scope.row.goodspackage }}
                    </div>

                </template>
            </el-table-column>
            <el-table-column fixed prop="status" label="商品状态">
                <template slot-scope="scope">
                    <div v-if="!scope.row.isupdate">
                        <el-tag v-if="scope.row.status == 1" type="success">上架</el-tag>
                        <el-tag v-else-if="(scope.row.status == 0)" type="danger">下架</el-tag>
                        <el-tag v-else-if="(scope.row.status == -1)" type="danger">禁用</el-tag>
                    </div>
                    <div v-else>
                        <el-select v-model="scope.row.status" placeholder="商品状态">
                            <el-option label="上架" :value="1"></el-option>
                            <el-option label="下架" :value="0"></el-option>
                            <el-option label="禁用" :value="-1"></el-option>
                        </el-select>
                    </div>

                </template>
            </el-table-column>
            <el-table-column fixed label="操作">
                <template slot-scope="scope">
                    <div v-if="!scope.row.isupdate">
                        <el-button type="text" @click.native.prevent="preUpdateRow(scope.row)">修改 </el-button>
                    </div>
                    <div v-else>
                        <el-button type="text" @click.native.prevent="updateRow(scope.row)"> 确认 </el-button>
                        <el-button type="text" @click.native.prevent="cancleUpdateRow(scope.row)">取消 </el-button>
                    </div>
                </template>
            </el-table-column>
        </CTable>
    </div>
</template>

<script>
import { getgoodsinfo, updategoodsinfo } from "@/api/goodsinfo.js"

export default {
    name: 'goodsinfo',
    data() {
        return {
            datatable: [],
            querygoodsifnoDto: {
                index: 1,
                page: 10,
                status: null,
                goodsname: "",
                startprice: 0,
                endprice: 1000,
                goodstype: "",
                starttime: "",
                endtime: ""
            },
            goodtypeselected: [],
            rowgoodtypeselected: [],
            issearchdetail: false,
            loading: true
        }
    },
    watch: {
        // goodtypeselected(newData, oldData) {
        //     console.log("goodtypeselected change", newData);
        //     this.querygoodsifnoDto.goodstype = newData[newData.length - 1]
        // },
        // rowgoodtypeselected(newData, oldData) {
        //     console.log("rowgoodtypeselected change", newData);
        //     let res;
        //     for (let i in this.datatable.datalist) {
        //         console.log(i);
        //         if (this.datatable.datalist[i].isupdate == true) {
        //             res = this.datatable.datalist[i]
        //             break;
        //         }
        //     }
        //     console.log(res);
        //     res.goodstype = newData[newData.length - 1]
        //     res.goodstypename = '11111'
        // }
    },
    async mounted() {
        await this.getGoodsinfo()
    },
    methods: {
        async getGoodsinfo() {
            this.loading = true
            let goodinfo = await getgoodsinfo(this.querygoodsifnoDto);
            this.loading = false


            for (let index = 0; index < goodinfo.datalist.length; index++) {
                goodinfo.datalist[index].isupdate = false
            }

            this.datatable = goodinfo;


        },
        preUpdateRow(row) {
            row.isupdate = true;
        },
        cancleUpdateRow(row) {
            row.isupdate = false;
        },
        async updateRow(row) {
            console.log(row);
            let res = await updategoodsinfo(row);
            this.$message({
                message: res,
                type: 'success'
            })
            row.isupdate = false;
        },
        handleSizeChange(val) {
            this.querygoodsifnoDto.page = val
            this.getGoodsinfo()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.querygoodsifnoDto.index = val
            this.getGoodsinfo()
            console.log(`当前页: ${val}`);
        },

    },
}
</script>

<style lang="scss" scoped>
.searchform {
    margin: 30px;
}
</style>