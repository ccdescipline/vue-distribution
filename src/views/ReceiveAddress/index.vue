<template>
    <div>
        <transition-group appear enter-active-class="animate__animated animate__fadeInRight" leave-active-class="leave">
            <div v-if="operateType == 'query'" key="1">
                <div>
                    <div style="width: 100%;height: 45px;">
                        <span class="el-form-item__label">收货地址</span>
                        <el-button type="text" @click="addReceiveaddress">添加收货地址</el-button>
                    </div>
                    <div v-if="ReceiveAddressinfo.ReceiveAddressList.length==0" >
                        <el-empty description="没有收货地址"></el-empty>
                    </div>
                    <el-form-item label="">
                        <div :class="item == ReceiveAddressinfo.selectAddress ? 'ReceiveItem select-item' : 'ReceiveItem un-select-item'"
                            v-for="item, index in ReceiveAddressinfo.ReceiveAddressList" :key="index">
                            <div>
                                <el-radio v-model="ReceiveAddressinfo.selectAddress" :label="item"
                                    style="font-size: 20px;">{{
                                            item.receivename
                                    }}</el-radio>
                                <span class="no-important-description">{{ item.phone }}</span>
                                <span class="no-important-description"> 邮编：{{ item.postalcode }}</span>
                                <el-tag style="margin-left: 10px;" size="small"
                                    v-if="item.isdefaultadrress">默认收货地址</el-tag>

                                <a style="float: right;margin-right: 10px;" @click="preeditReceiveaddress(item)"><i
                                        class="el-icon-edit-outline"></i></a>
                                <a style="float: right;margin-right: 10px;color: red;" @click="deleteAddress(item)"><i
                                        class="el-icon-delete"></i></a>

                            </div>

                            <div style=" width: 100%;height: 20px;" class="ReceiveDescription">
                                {{ item.provinceaddress }}
                                {{ item.cityaddress }}

                                {{ item.areaaddress }}
                                {{ item.detailaddress
                                }}
                            </div>


                        </div>
                    </el-form-item>
                </div>
            </div>
            <div v-if="operateType == 'edit' || operateType == 'add'" key="2">
                <div>
                    <el-card>
                        <template slot="header">
                            <el-page-header @back="() => { this.refreshData() }" content="收货地址">

                            </el-page-header>

                        </template>
                        <div>
                            <div v-if="operateType == 'edit'">
                                <el-form :model="editReceiveAddress" size="small">
                                    <el-form-item label="省市区">
                                        <el-cascader style="width: 60%;" :options="addressOptioninfo.addressOption"
                                            v-model="addressOptioninfo.selectOption" @change="editaddressOptionChange">
                                        </el-cascader>

                                    </el-form-item>
                                    <el-form-item label="详细地址">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容"
                                            v-model="editReceiveAddress.detailaddress" />
                                    </el-form-item>
                                    <el-form-item label="手机号">
                                        <el-input placeholder="请输入内容" v-model="editReceiveAddress.phone" />
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <el-input placeholder="请输入内容" v-model="editReceiveAddress.receivename" />
                                    </el-form-item>
                                    <el-button v-if="!editReceiveAddress.isdefaultadrress" type="primary"
                                        @click="Onsetdefaultadrress" size="small">设置成默认收货地址</el-button>
                                    <el-tag v-if="editReceiveAddress.isdefaultadrress" type="">默认收货地址</el-tag>

                                    <div style="text-align: center;margin-top: 10px;">
                                        <el-button style="width: 80%;margin: 0  auto;" type="primary"
                                            @click="saveReceiveaddress">保存</el-button>
                                    </div>

                                </el-form>
                            </div>
                            <!-- 添加 -->
                            <div v-if="operateType == 'add'">
                                <el-form :model="addReceiveAddress" size="small">
                                    <el-form-item label="省市区">
                                        <el-cascader style="width: 60%;"
                                            :options="insertaddressOptioninfo.addressOption"
                                            v-model="insertaddressOptioninfo.selectOption"
                                            @change="insertaddressOptionChange">
                                        </el-cascader>

                                    </el-form-item>
                                    <el-form-item label="详细地址">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容"
                                            v-model="addReceiveAddress.detailaddress" />
                                    </el-form-item>
                                    <el-form-item label="手机号">
                                        <el-input placeholder="请输入内容" v-model="addReceiveAddress.phone" />
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <el-input placeholder="请输入内容" v-model="addReceiveAddress.receivename" />
                                    </el-form-item>
                                    <el-button v-if="!addReceiveAddress.isdefaultadrress" type="primary"
                                        @click="Onsetinsertdefaultadrress" size="small">设置成默认收货地址</el-button>
                                    <el-tag v-if="addReceiveAddress.isdefaultadrress" type="">默认收货地址</el-tag>

                                    <div style="text-align: center;margin-top: 10px;">
                                        <el-button style="width: 80%;margin: 0  auto;" type="primary"
                                            @click="saveReceiveaddress">保存</el-button>
                                    </div>

                                </el-form>
                            </div>

                        </div>

                    </el-card>

                </div>
            </div>
        </transition-group>



    </div>
</template>

<script>
import { getcurrentReceiveAdress, insetReceiveAdress, updateReceiveAdress, removeReceiveAdress }
    from "@/api/receviceAddress"
//regionData是省市区三级联动数据（不带“全部”选项）
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'

export default {
    model: {
        prop: 'Receiveaddress',
        // 随便命名事件，对应下面$emit即可
        event: 'selectdataChange',
    },
    data() {
        return {
            //收货地址
            ReceiveAddressinfo: {
                idFinish: false,
                ReceiveAddressList: [],
                //当前选中的地址
                selectAddress: {}
            },
            //修改的地址
            editReceiveAddress: {},
            //添加的地址
            addReceiveAddress: {
                provinceaddress: "",
                cityaddress: "",
                areaaddress: "",
                detailaddress: "",

                phone: "",
                postalcode: 0,
                receivename: "",
                isdefaultadrress: false,
            },
            operateType: "query",
            isShow: true,
            addressOptioninfo: {
                addressOption: regionData,
                selectOption: []
            },
            insertaddressOptioninfo: {
                addressOption: regionData,
                selectOption: []
            },


        }
    },

    watch: {
        'ReceiveAddressinfo.selectAddress': function (newData, oldData) {
            this.$emit("selectdataChange", `${newData.receivename} ${newData.phone} ${newData.provinceaddress} ${newData.cityaddress} ${newData.areaaddress} ${newData.detailaddress} `)
        }
    },
    mounted() {

        this.getReceiveaddress();
    },
    methods: {
        refreshData() {
            this.operateType = "query";
            this.getReceiveaddress();
        },
        async getReceiveaddress() {
            this.ReceiveAddressinfo.idFinish = false;
            this.ReceiveAddressinfo.ReceiveAddressList = await getcurrentReceiveAdress();
            this.ReceiveAddressinfo.idFinish = true;
            console.log(this.ReceiveAddressinfo.ReceiveAddressList);

            //设置默认收货
            this.ReceiveAddressinfo.ReceiveAddressList.forEach((item, index) => {
                if (item.isdefaultadrress) {
                    this.ReceiveAddressinfo.selectAddress = item;
                }
            });
        },


        addReceiveaddress() {
            console.log(this.ReceiveAddressinfo.selectAddress);
            this.operateType = "add";
        },

        preeditReceiveaddress(editdata) {
            this.operateType = "edit";
            console.log(editdata);
            this.editReceiveAddress = editdata

            //绑定省市区三级联动
            let provinceinfo = TextToCode[editdata.provinceaddress]
            this.addressOptioninfo.selectOption[0] = provinceinfo.code

            let cityinfo = provinceinfo[editdata.cityaddress]
            this.addressOptioninfo.selectOption[1] = cityinfo.code

            let areainfo = cityinfo[editdata.areaaddress]
            this.addressOptioninfo.selectOption[2] = areainfo.code

            console.log(cityinfo);
        },
        //三级联动内容改变
        editaddressOptionChange(value) {
            console.log(value);
            this.editReceiveAddress.provinceaddress = CodeToText[value[0]]
            this.editReceiveAddress.cityaddress = CodeToText[value[1]]
            this.editReceiveAddress.areaaddress = CodeToText[value[2]]
            this.editReceiveAddress.postalcode = parseInt(value[2])

            console.log(this.editReceiveAddress);
        },
        //设置默认收货地址
        Onsetdefaultadrress() {
            this.editReceiveAddress.isdefaultadrress = true;
            this.setDefaultaddress = true
        },

        insertaddressOptionChange(value) {
            console.log(value);
            this.addReceiveAddress.provinceaddress = CodeToText[value[0]]
            this.addReceiveAddress.cityaddress = CodeToText[value[1]]
            this.addReceiveAddress.areaaddress = CodeToText[value[2]]
            this.addReceiveAddress.postalcode = parseInt(value[2])

            console.log(this.addReceiveAddress);
        },
        Onsetinsertdefaultadrress() {
            this.addReceiveAddress.isdefaultadrress = true;
            this.setDefaultaddress = true
        },

        deleteAddress(item) {
            let _this = this;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this = _this
                console.log(item);
                removeReceiveAdress(item).then(data => {
                    this.$message({
                        type: 'success',
                        message: data
                    });
                    _this.refreshData();


                });

            }).catch(() => {
            });

        },

        saveReceiveaddress() {
            switch (this.operateType) {
                case 'edit': {
                    console.log(this.editReceiveAddress);

                    updateReceiveAdress(this.editReceiveAddress).then(data => {
                        this.$message({
                            message: data,
                            type: 'success'
                        })
                        this.refreshData();
                    });
                    break;
                }
                case 'add': {
                    console.log(this.addReceiveAddress);

                    insetReceiveAdress(this.addReceiveAddress).then(data => {
                        this.$message({
                            message: data,
                            type: 'success'
                        })
                        this.refreshData();
                    });
                    break;
                }



                default:
                    break;
            }

        },

    },

}
</script>

<style lang="scss" scoped>
.ReceiveItem {
    width: 100%;
    height: 80px;
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

.select-item {
    border: 1px solid #409EFF;
}

.un-select-item {
    border: 1px solid rgb(199, 199, 199);
}

.showPage {
    // position: absolute;
}

.leave {
    display: none;
}
</style>