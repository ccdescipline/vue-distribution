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

                <el-form-item>
                    <el-button type="primary" size="small" @click="getGoodsmarketinfo">搜索</el-button>
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
                </el-form>
            </transition>
        </div>

        <!-- <el-switch v-model="loading" /> -->
        <ul class="goods-Container">
            <li v-for="item, index in goodsinfo.datalist" :key="index" class="goodsitem">
                <template>
                    <el-skeleton animated :loading="loading">
                        <template slot="template">
                            <el-skeleton-item variant="image" class="goodsshowimg" />
                            <div style="padding: 10px;height: 100px;">
                                <el-skeleton-item variant="p" style="width: 50%" />
                                <el-skeleton-item variant="text" style="margin-right: 16px;" />
                                <el-skeleton-item variant="text" />
                                <el-skeleton-item variant="text" style="width: 20%;" />
                            </div>

                        </template>
                        <template>
                            <img class="goodsshowimg" :src="item.goodsinfo.goodsshowimg"
                                @click="ShowGoodsDetail(item.goodsinfo)" />
                            <div style="padding: 10px;height: 100px;">
                                <div class="line1">
                                    <div class="goodsprice">￥
                                        {{ item.goodsprice }}
                                    </div>
                                    <div class="goodsCount">
                                        库存：{{ item.count }}
                                    </div>
                                </div>

                                <div class="GoodsDescription">
                                    {{ item.goodsname }}
                                </div>
                                <div class="Goods-footer">
                                    <div>
                                        <a class=" companyName">{{ item.companyname }}</a>
                                    </div>
                                    <div>
                                        <a @click="AddGoodsCart(item)"><i style="font-size:30px"
                                                class="el-icon-circle-plus-outline"></i></a>
                                    </div>

                                </div>

                            </div>
                        </template>
                    </el-skeleton>
                </template>
            </li>
        </ul>
        <!-- 分页 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
             layout="prev, pager, next, jumper, sizes" :page-count="goodsinfo.rowcount"
            :page-size.sync="querygoodsifnoDto.page" :current-page.sync="querygoodsifnoDto.index"
             >
        </el-pagination>


        <div class="Shopping-Cart" v-if="goodsCartinfo.reqQueryGoodsPriceItemList.length > 0">
            <div class="Shopping-Cart-container">
                <div>
                    <span style="font-size: 17px;">
                        总金额
                    </span>
                    <span class="currency">
                        ￥
                    </span>
                    <span class="price">
                        {{ TotalPrice }}
                    </span>

                    <a class="receiveaddress" :title='goodsCartinfo.receiveaddress'>
                        地址：{{ goodsCartinfo.receiveaddress }}
                    </a>
                </div>


                <div>
                    <!-- <el-input type="textarea" v-model="goodsCartinfo.receiveaddress"></el-input> -->
                    <el-switch style="height: 32px;" v-model="goodsCartinfo.isShowDetail" active-text="详情"></el-switch>

                </div>

            </div>



        </div>
        <!-- enter-leave-class="animate__animated animate__slideInDown" -->
        <transition enter-active-class="animate__animated animate__slideInUp"
            leave-active-class="animate__animated animate__slideOutDown">
            <div v-if="goodsCartinfo.isShowDetail" class="Shopping-Cart-detail">
                <el-card class="box-card goodscart-Detail">
                    <div slot="header" class="clearfix">
                        <el-form>
                            <ReceiveAddress v-model="goodsCartinfo.receiveaddress"></ReceiveAddress>
                        </el-form>

                        <!-- <span>收货地址</span> -->

                    </div>

                    <div style="width: 100%;height: 60px;">
                        <span class="el-form-item__label">商品详情</span>
                        <el-divider></el-divider>
                    </div>

                    <div v-for="item, index in goodsCartinfo.reqQueryGoodsPriceItemList" :key="index"
                        class="text item ">
                        <div class="goodsDetail-item">
                            <div style="display: flex;">
                                <img style="width: 50px;height: 50px;" :src="item.goodsshowimg" alt="">
                                <div class="goods-description-price">
                                    <div class="goods-description">{{ item.goodsname }}</div>
                                    <div>
                                        <span class="goods-price">
                                            ￥{{ item.goodsprice }}
                                        </span>
                                        /
                                        <span class="goodsPackage">
                                            {{ item.goodspackage }}
                                        </span>

                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column;justify-content:center; ">
                                <el-input-number :min="0" v-model="item.count" size="small"></el-input-number>
                            </div>
                        </div>

                        <el-divider></el-divider>
                    </div>



                    <div style="width: 100%;height: 50px;">
                        <el-button style="float: right;" size="small" type="primary"
                            @click="submitGoodcartPriceClient">结算</el-button>
                    </div>
                </el-card>
            </div>
        </transition>

        <!-- 商品介绍 -->
        <!-- :visible.sync="dialogVisible" -->
        <!-- v-if="dialogVisible" -->
        <el-dialog title="商品详情" :visible.sync="dialogVisible" width="50%" ref="dialog" :lock-scroll="false"
            @opened="dialogOpen" @close="dialogClose">
            <div v-if="dialogOpened" class="detailImg-Container">
                <img class="showImg" v-for="item, index in currentgoodsdetail.vfGoodsDetailsImgs" :key="index"
                    :src="item.goodsdetailsimg" />
            </div>

        </el-dialog>
    </div>
</template>

<script>
import { getGoodsinfo, submitGoodsCart, queryGoodcartPrice } from "@/api/DealerMarker"
import { getcurrentReceiveAdress, insetReceiveAdress, updateReceiveAdress, removeReceiveAdress } from "@/api/receviceAddress"

export default {
    data() {
        return {
            goodsinfo: [],
            loading: true,
            goodsCartinfo: {
                isShowDetail: false,
                //购物车存储
                reqQueryGoodsPriceItemList: [],
                receiveaddress: ""
            },
            // //收货地址
            // ReceiveAddressinfo: {
            //     idFinish: false,
            //     ReceiveAddressList: [],
            //     selectAddress: {}
            // },

            querygoodsifnoDto: {
                index: 1,
                page: 20,
                status: null,
                goodsname: "",
                startprice: 0,
                endprice: 1000,
                goodstype: "",
                starttime: "",
                endtime: ""
            },
            issearchdetail: false,
            dialogVisible: false,
            dialogOpened: false,
            //当前商品详情
            currentgoodsdetail: {},
            ReceiveAddressShow: true,

            //询价结果
            TotalPrice: 0,


        }
    },
    mounted() {
        this.getGoodsmarketinfo();


    },
    methods: {

        async getGoodsmarketinfo() {
            this.loading = true;
            this.goodsinfo = await getGoodsinfo(this.querygoodsifnoDto);
            this.loading = false;
            console.log(this.goodsinfo);
        },

        handleSizeChange(val) {
            console.log('pageSizechange', val)
            //this.querygoodsifnoDto.page = val;
            this.getGoodsmarketinfo();
        },
        //页数改变
        handleCurrentChange(val) {
            console.log('indexchange', val)
            //this.querygoodsifnoDto.index = val;
            this.getGoodsmarketinfo();
        },

        //显示商品详情
        ShowGoodsDetail(goodsdetail) {

            this.dialogVisible = true

            //排序商品图片
            goodsdetail.vfGoodsDetailsImgs.sort((a, b) => {
                return a.index - b.index
            })

            this.currentgoodsdetail = goodsdetail;


            console.log(goodsdetail);
        },

        //解决打开不同页面后回滚到顶部
        dialogOpen() {
            if (this.$refs.dialog.$el) {
                this.$refs.dialog.$el.scrollTop = 0;
                this.dialogOpened = true;
            }
        },
        dialogClose() {
            this.dialogOpened = false;
        },

        //点击加入购物车
        AddGoodsCart(row) {
            console.log(row);

            //判断商品是否在购物车
            let findres = this.goodsCartinfo.reqQueryGoodsPriceItemList.find((x) => {
                return x.goodsid == row.goodsid
            });




            if (findres != undefined) {

                //判断商品库存是否超
                let goodlist = this.goodsinfo.datalist;
                let currentgoodsinfo = goodlist.find(x => {
                    return x.goodsid == findres.goodsid
                })

                if (currentgoodsinfo.count <= findres.count) {
                    this.$message.error('商品库存上限');
                    return
                }
                findres.count++;
            } else {


                this.goodsCartinfo.reqQueryGoodsPriceItemList.push({
                    goodsid: row.goodsid,
                    goodsname: row.goodsname,
                    count: 1,
                    goodsprice: row.goodsprice,
                    goodsshowimg: row.goodsinfo.goodsshowimg,
                    goodspackage: row.goodspackage
                })
            }

            this.queryGoodcartPriceClient();
        },
        //结算
        submitGoodcartPriceClient() {
            console.log(this.goodsCartinfo);

            submitGoodsCart(this.goodsCartinfo).then(data => {
                this.$message({
                    type: 'success',
                    message: data
                });
                location.reload()

            })
        },
        //询价
        queryGoodcartPriceClient() {
            queryGoodcartPrice(this.goodsCartinfo.reqQueryGoodsPriceItemList).then(data => {
                this.TotalPrice = data
            })
        }
    },
}
</script>

<style lang="scss" scoped>
$ItemWidth: 200px;

.goodsitem {
    width: $ItemWidth;
    height: 300px;
    // background-color: rgb(221, 221, 221);
    margin: 15px 26px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    .goodsshowimg {
        width: 100%;
        height: $ItemWidth;
    }
}

.goods-Container {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
}

.goodsprice {
    color: red;
    font-weight: bolder;
}

.GoodsDescription {
    margin-top: 5px;
    margin-left: 2px;
    font-size: 10px;

    // height: 20px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;

    display: -webkit-box;
    /* 盒子类型 */
    word-break: break-all;
    /* 自动换行的处理方法。允许在单词内换行 */
    text-overflow: ellipsis;
    /* 溢出时用... */
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 最大行数 */

}

.companyName {
    margin-top: 10px;
    margin-left: 2px;
    font-size: 10px;
    text-decoration: underline;
    line-height: 30px;

}

.companyName:hover {

    color: red;
}

.Goods-footer {
    display: flex;
    justify-content: space-between;
}

.Shopping-Cart {
    width: 600px;
    height: 50px;
    background-color: rgb(55, 192, 255);
    border-radius: 25px;
    right: 200px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);


    position: fixed;
    bottom: 0;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 50px;


    .currency {
        font-size: 10px;
    }

    .price {
        font-size: 20px;
        line-height: 32px;
        color: red;
        font-weight: bolder;
    }

    .Shopping-Cart-container {
        display: flex;
        justify-content: space-between;
        height: 32px;
    }

    .receiveaddress {
        width: 150px;
        font-size: 10px;
        margin-left: 10px;

        overflow: hidden;
        /*超出部分隐藏*/
        text-overflow: ellipsis;
        /*超出部分省略号表示*/
        white-space: nowrap;
        /*强制单行显示*/
        display: inline-block;
        /*转换为行内块元素*/
    }
}

.Shopping-Cart-detail {
    position: fixed;
    bottom: 53px;
    background-color: white;
    width: 600px;
    height: 600px;
    right: 200px;

}

.searchform {
    margin: 30px;
    margin-left: 70px;
}

.detailImg-Container {
    width: 80%;
    margin: 0 auto;

    .showImg {
        width: 100%;
        margin: 0;
        padding: 0;
        font-size: 0;
        vertical-align: top;
    }
}

.line1 {
    display: flex;
    justify-content: space-between;
}

.goodsCount {
    font-size: 10px;
    line-height: 20px;
}

/* 设置滚动条的样式 */
.goodscart-Detail::-webkit-scrollbar {
    width: 12px;
}

/* 滚动槽 */
.goodscart-Detail::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

/* 滚动条滑块 */
.goodscart-Detail::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}

.goodscart-Detail::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.1);
}

.goodscart-Detail {
    height: 100%;
    overflow-y: auto;



    .goods-description {
        font-size: 15px;

    }

    .goods-price {
        color: red;
    }

    .goods-description-price {
        display: flex;

        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;

    }

    .goodsDetail-item {
        display: flex;
        justify-content: space-between;
    }

    .goodsPackage {
        font-size: 10px;
    }

    .ReceiveItem {
        width: 100%;
        height: 80px;
        border: 1px solid black;
        border-radius: 13px;
        padding: 5px;
        margin-bottom: 10px;

        .ReceiveDescription {
            padding: 0;
            margin: 0;
            margin-left: 23px;
            height: 20px;
            font-size: 5px;
            line-height: 20px;
        }

        .no-important-description {
            font-size: 5px;
        }
    }
}
</style>