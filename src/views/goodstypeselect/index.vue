<template>
    <div>
        <el-cascader style="width: 100%;" ref="goodtypeselect" v-model="selected" :options="showData" clearable @change="handleChange"></el-cascader>
    </div>
</template>

<script>
import { getactivegoods } from '@/api/goodstype.js'
export default {


    name: 'goodstypeselect',
    model: {
        prop: 'selectdata',
        // 随便命名事件，对应下面$emit即可
        event: 'selectdataChange',
    },
    props: {
        selectdata: { String }
    },
    watch: {
        selected: function (newData, oldData) {
            console.log("选中的值", newData);
            this.$emit('selectdataChange', newData[newData.length - 1])
        },
        selectdata: function (newData, oldData) {
            console.log("selectdata change");
        }
    },

    data() {
        return {
            selected: [],
            showData: [

            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
        }
    },
    async mounted() {
        await this.getdata()
    },
    methods: {
        async getdata() {
            this.RawData = await getactivegoods()

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

            this.showData = this.findson("0", Sdata[0]).children
            // console.log("this.showData");
            // console.log(this.showData);

            // console.log("selectdata",this.selectdata);
            // this.selected = ['0df5cfb2-6da4-11ed-8144-3024323e00de', '52a93542-6e1a-11ed-996d-3024323e00de', '7227a66e-6e1a-11ed-996d-3024323e00de']

            let arr = [];
            this.findparentbygoodstypeid(this.selectdata,arr,this.RawData)
            console.log(arr);
            this.selected = arr

            
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
                        label: item.goodstypename,
                        value: item.goodstypeid,
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
            } else {
                Reflect.deleteProperty(constructData, 'children')
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
        findparentbygoodstypeid(goodstypeid,constructArray,goodstypeinfo){
            // goodstypeinfo.forEach((item, index) => {
            //     if (item.goodstypeid === goodstypeid) {
            //         res.push(item)
            //     }
            // });
            console.log("goodstypeid",goodstypeid);
            console.log("goodstypeinfo",goodstypeinfo);

            for (let index = 0; index < goodstypeinfo.length; index++) {
                const element = goodstypeinfo[index];
                if(element.goodstypeid === goodstypeid){
                    console.log(goodstypeid , element.goodstypename);
                    constructArray.unshift(element.goodstypeid);
                    this.findparentbygoodstypeid(element.goodsparentid,constructArray,goodstypeinfo)
                    break;
                }
            }
        },
        /**
         * 当选中的改变时，回调选中的文本信息
         * @param  value 
         */
        handleChange(value) {
            //console.log(value);
            //console.log(this.$refs.goodtypeselect.getCheckedNodes()[0].label);
            try {
                this.$emit("changelabel",this.$refs.goodtypeselect.getCheckedNodes()[0].label)
            } catch (error) {
                this.$emit("changelabel","")
            }
            
        }
    },
}
</script>

<style lang="scss" scoped>

</style>