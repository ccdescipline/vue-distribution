<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未收货" :name="2"></el-tab-pane>
            <el-tab-pane label="已收货" :name="3"></el-tab-pane>
        </el-tabs>
        <CTable v-model="orderlistinfo" style="width: 100%">
            <el-table-column fixed type="expand">
                <template slot-scope="props">
                    <div class="goodsitem" v-for="item, index in props.row.orderinfo" :key="index"
                        style="padding-left: 30px;margin-bottom: 30px;margin-top: 15px;">


                        <img :src="item.goodsshowimg" style="width: 40px;height: 40px;" />

                        <div class="showtext">{{ item.goodsname }}</div>
                        <div class="showtext">{{ item.goodsprice }}/{{ item.goodspackage }}</div>
                        <div class="showtext">*{{ item.goodscount }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed prop="orderid" label="订单号">

            </el-table-column>
            <el-table-column fixed prop="receiveaddress" label="收货地址">

            </el-table-column>
            <el-table-column fixed label="订单价格">
                <template slot-scope="scope">
                    {{ computeprice(scope.row.orderinfo) }}
                </template>

            </el-table-column>
            <el-table-column fixed prop="createtime" label="创建时间">

            </el-table-column>
            <el-table-column fixed label="操作">
                <template slot-scope="scope" style="display: flex;">

                    <el-button v-if="scope.row.status == 2" type="text" @click="confirmorder(scope.row)">确认收货</el-button>
                    <el-button v-if="scope.row.status != 3 " type="text" @click="cancleorder(scope.row)">取消订单</el-button>
                </template>
            </el-table-column>
        </CTable>
    </div>
</template>

<script>
import { queryGoodsOrder, receiveGoodsOrder, cancleGoodsOrder } from "@/api/dealerOrder"

export default {
    data() {
        return {
            activeName: 0,
            queryorderdto: {
                index: 1,
                page: 10,
                status: 2
            },
            orderlistinfo: {}
        }
    },
    mounted() {
        this.queryorder();
    },
    methods: {
        async queryorder() {
            this.orderlistinfo = await queryGoodsOrder(this.queryorderdto);
            console.log(this.orderlistinfo);
        },
        handleClick() {
            console.log(this.activeName);
            this.queryorderdto.status = this.activeName
            this.queryorder();
        },
        computeprice(row) {
            console.log(row);
            let totalprice = 0
            row.forEach(function (item) {
                totalprice += item.goodscount * item.goodsprice
            })

            return totalprice;
        },
        cancleorder(row) {
            cancleGoodsOrder({ orderid: row.orderid }).then(data => {
                this.$message({
                    message: data,
                    type: 'success'
                })
                this.queryorder();
            })
        },
        confirmorder(row) {
            receiveGoodsOrder({ orderid: row.orderid }).then(data => {
                this.$message({
                    message: data,
                    type: 'success'
                })
                this.queryorder();
            })
        },
        send(row) {
            this.$prompt('请输入快递单号', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '不能为空'
            }).then(({ value }) => {
                orderSend({ orderid: row.orderid, trackingnumber: value }).then(data => {
                    this.$message({
                        type: 'success',
                        message: data
                    });
                    this.queryorder();
                })

            })
        }
    },
}
</script>

<style lang="scss" scoped>
.goodsitem {
    display: flex;

    .showtext {
        line-height: 40px;
        margin-left: 50px;
        width: 100px;
        text-align: center;
    }
}
</style>