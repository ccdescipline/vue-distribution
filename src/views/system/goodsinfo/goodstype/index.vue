<template>
    <div id="app-container">
        <div class="tree-container">
            <el-card class="box-card card" style="width: 500px;">
                <div slot="header" class="clearfix">
                    <span>商品分类</span>
                </div>
                <el-tree :data="showData" :props="defaultProps" draggable :expand-on-click-node="false" ref="goodtree"
                    node-key="goodstypeid" @node-drop="handleDrop">
                    <div style="flex: 1;" slot-scope="{ node, data }" @click="OnClicktreerow(node)">
                        <div>
                            <div class="custom-tree-node" v-if="!data.isupdate">
                                <div>
                                    {{ node.label }}
                                </div>
                                <div>
                                    <el-button type="text" size="mini" @click.native.prevent="AppendChild(data)">
                                        添加
                                    </el-button>
                                    <el-button type="text" size="mini" @click="updatenode(data)">
                                        修改
                                    </el-button>
                                </div>
                            </div>
                            <div class="custom-tree-node" v-else>
                                <input v-model="data.name" />
                                <div>
                                    <el-button type="text" size="mini" @click="updatecancle(node)">
                                        确认
                                    </el-button>
                                    <!-- <el-button type="text" size="mini" @click="updatecancle(data)">
                                    取消
                                </el-button> -->
                                </div>
                            </div>
                        </div>

                    </div>
                </el-tree>
            </el-card>

            <el-card class="box-card card" style="width: 500px;">
                <div slot="header" class="clearfix">
                    <span>商品信息</span>
                </div>
                <div
                    v-if="(Object.keys(updateData).length !== 0) && !(updateData.goodsparentid == '0' && updateData.goodstypeid == '0')">
                    <el-form :model="updateData" :label-position="labelPosition" label-width="80px"
                        style="width: 100%;">
                        <el-form-item label="品名">
                            <el-input v-model="updateData.name" placeholder="品名"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="updateData.status">
                                <el-option label="启用" :value="1"></el-option>
                                <el-option label="弃用" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-button type="primary" style="width: 100%;" @click="updateGoodstype({
                            goodstypeid: updateData.goodstypeid,
                            goodstypename: updateData.name,
                            goodsparentid: updateData.goodsparentid,
                            status: updateData.status
                        })">修改</el-button>
                    </el-form>
                </div>
            </el-card>
        </div>


        <div ref="goodstypetree" id="goodstypetree" style="width: 100%; height: 1000px;"></div>
    </div>
</template>

<script>
import { getgoodsinfo, insertgoodstypeinfo, updategoodstypeinfo } from '@/api/goodstype.js'

export default {
    name: 'goodtype',
    data() {
        return {
            showData: [

            ],
            RawData: [

            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            updateData: {},
            labelPosition: 'left'
        }
    },
    async mounted() {
        await this.getdata()

        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(this.$refs.goodstypetree);

        let option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',
                    data: this.showData,
                    top: '18%',
                    bottom: '14%',


                    symbolSize: 7,
                    initialTreeDepth: 3,
                    animationDurationUpdate: 750,
                    emphasis: {
                        focus: 'descendant'
                    }
                }
            ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    methods: {
        async getdata() {
            this.RawData = await getgoodsinfo()

            let Sdata = [
                {
                    name: '商品',
                    goodstypeid: '0',
                    goodsparentid: '0',
                    status: 1,
                    children: [],
                    isupdate: false
                },
            ];

            this.showData = [this.findson("0", Sdata[0])]
            console.log("this.showData");
            console.log(this.showData);
        },
        findson(childrenID, constructData) {
            //console.log(`childrenID : ${childrenID}`);
            //拿子元素集合
            let resArr = this.getgoodsinfobyparrentid(this.RawData, childrenID)
            // console.log('resArr:');
            // console.log(resArr);
            if (resArr.length != 0) {
                //遍历
                resArr.forEach((item) => {

                    // console.log('item');
                    // console.log(item);

                    var Data = {
                        name: item.goodstypename,
                        goodstypeid: item.goodstypeid,
                        goodsparentid: item.goodsparentid,
                        status: item.status,
                        children: [],
                        isupdate: false
                    }

                    var children = this.findson(item.goodstypeid, Data)

                    Data.children = children.children

                    // console.log("constructData");
                    // console.log(constructData);
                    constructData.children.push(Data);
                })
            }
            return constructData;
        },
        /**
         * 返回指定父元素的
         * @param {*} goodstypeinfo 
         * @param {*} goodsparentid 
         */
        getgoodsinfobyparrentid(goodstypeinfo, goodsparentid) {
            let res = []

            goodstypeinfo.forEach((item, index) => {
                if (item.goodsparentid === goodsparentid) {
                    res.push(item)
                }
            });

            return res;
        },
        //拖拽完成
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log(`${draggingNode?.label} to ${dropNode?.data.name} type ${dropType}`, dropNode?.data.goodstypeid);
            // console.log('tree drop: ', dropNode.label, dropType);

            // console.log('draggingNode',draggingNode);
            // updategoodstypeinfo({
            //     goodstypeid: draggingNode.data.goodstypeid,
            //     goodstypename: draggingNode.data.name,
            //     goodsparentid: dropType=='inner'? dropNode.data.goodstypeid : dropNode.parent.data.goodstypeid,
            //     status: draggingNode.data.status
            // }).then((data)=>{
            //     this.$message({
            //         message: data,
            //         type: 'success'
            //     })
            // }).catch((data)=>{
            //     this.$message.error(data)
            // });

            this.updateGoodstype({
                goodstypeid: draggingNode.data.goodstypeid,
                goodstypename: draggingNode.data.name,
                goodsparentid: dropType == 'inner' ? dropNode.data.goodstypeid : dropNode.parent.data.goodstypeid,
                status: draggingNode.data.status
            });

        },
        AppendChild(data) {
            data.children.push({
                name: '新商品',
                children: [],
                isupdate: true,
                goodstypeid: '',
                goodsparentid: '',
                status: 1
            })
            console.log(data);
            // console.log(data);
            // console.log(this.$refs.goodtree.store.nodesMap[data.goodstypeid].expanded );
            this.$refs.goodtree.store.nodesMap[data.goodstypeid].expanded = true;


            //this.expandedKeys.push(data.$treeNodeId);
        },
        updatenode(row) {
            row.isupdate = true;
        },
        async updatecancle(node) {
            let res;
            //判断是更新还是添加
            if (node.data.goodstypeid == "") {
                console.log("添加");
                res = await insertgoodstypeinfo({
                    goodsname: node.data.name,
                    parentid: node.parent.data.goodstypeid
                })

                this.$message({
                    message: res,
                    type: 'success'
                })
            } else {
                console.log("修改");

                // res = await updategoodstypeinfo({
                //     goodstypeid: node.data.goodstypeid,
                //     goodstypename: node.data.name,
                //     goodsparentid: node.data.goodsparentid,
                //     status: node.data.status
                // });

                this.updateGoodstype({
                    goodstypeid: node.data.goodstypeid,
                    goodstypename: node.data.name,
                    goodsparentid: node.data.goodsparentid,
                    status: node.data.status
                });
            }

            console.log(node.data);
            console.log(node.parent.data);
            node.data.isupdate = false;

        },
        OnClicktreerow(row) {
            console.log(row.data);
            this.updateData = row.data
        },
        updateGoodstype(data) {
            updategoodstypeinfo(data).then((data) => {
                this.$message({
                    message: data,
                    type: 'success'
                })
            }).catch((data) => {
                this.$message.error(data)
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.tree-container {
    padding: 20px;
    display: flex;
    flex-wrap: nowrap;

    .card {
        margin: 0 10px;
    }
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>