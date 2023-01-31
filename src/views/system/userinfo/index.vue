<template>
    <div class="app-container">
        <div style="margin:30px 0 ">
            <!-- <el-form label-position="right" label-width="80px">
                <el-form-item label="用户名">
                    <el-input placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="公司名">
                    <el-input placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item label="名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input></el-input>
                </el-form-item>
            </el-form> -->
            
            <el-row :gutter="22" style="width: 80%;">
                <el-col :span="2">
                    <div style="line-height: 40px;text-align: right;">查询条件:</div>
                 </el-col>
                <el-col :span="6">
                    <span></span>
                    <el-input v-model="queryuserinfoDto.username" placeholder="用户名"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="queryuserinfoDto.companyname" placeholder="公司名"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="queryuserinfoDto.status" placeholder="状态" >
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="禁用" :value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-button icon="el-icon-search" type="primary" circle @click.native.prevent="getuserinfo"></el-button>
                </el-col>
            </el-row>
        </div>

        <CTable v-model="userInfo" @indexchange="handleCurrentChange" @pageSizechange="handleSizeChange" :loading="loading">
            <el-table-column fixed prop="username" label="用户名">
                <!-- <template slot-scope="scope">
                    <span v-if="!scope.row.isupdate">{{ scope.row.username }}</span>
                    <el-input v-else v-model="scope.row.username" placeholder="用户名"></el-input>
                </template> -->
            </el-table-column>
            <el-table-column fixed prop="companyname" label="公司名">
                <template slot-scope="scope">
                    <span v-if="!scope.row.isupdate">{{ scope.row.companyname }}</span>
                    <el-input v-else v-model="scope.row.companyname" placeholder="公司名"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed prop="usersex" label="性别">
                <template slot-scope="scope">
                    <div v-if="!scope.row.isupdate">
                        <span>{{ scope.row.usersex }}</span>
                    </div>
                    <el-select v-else v-model="scope.row.usersex" placeholder="">
                        <el-option label="男" value="男">男</el-option>
                        <el-option label="女" value="女">女</el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column fixed prop="useremail" label="邮箱">
                <template slot-scope="scope">
                    <span v-if="!scope.row.isupdate">{{ scope.row.useremail }}</span>
                    <el-input v-else v-model="scope.row.useremail" placeholder="邮箱"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed prop="userphone" label="手机号">
                <template slot-scope="scope">
                    <span v-if="!scope.row.isupdate">{{ scope.row.userphone }}</span>
                    <el-input v-else v-model="scope.row.userphone" placeholder="手机号"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed prop="userstatus" label="账户状态">
                <template slot-scope="scope">
                    <!-- <el-tag :type="(scope.userStatus==1?'success':'danger')">标签二</el-tag> -->
                    <div v-if="!scope.row.isupdate">
                        <el-tag v-if="scope.row.userstatus == 1" type="success">启用</el-tag>
                        <el-tag v-else type="danger">禁用</el-tag>
                    </div>
                    <div v-else>
                        <el-select v-model="scope.row.userstatus" placeholder="">
                            <el-option label="启用" :value="1"></el-option>
                            <el-option label="禁用" :value="0"></el-option>
                        </el-select>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed label="操作">
                <template slot-scope="scope">
                    <div v-if="!scope.row.isupdate">
                        <el-button type="text" @click.native.prevent="resetpassword(scope.row.username)">重置密码 </el-button>
                        <el-button type="text" @click.native.prevent="preupdatedata(scope.$index)">修改</el-button>
                    </div>
                    <div v-else>
                        <el-button type="text" @click.native.prevent="handleupdaterow(scope.row)">确认</el-button>
                    </div>
                </template>
            </el-table-column>
        </CTable>
    </div>
</template>

<script>
import { getUserinfo, resetpwd, updateuserinfo } from '@/api/userinfo.js'

export default {
    name: 'userinfo',
    data() {
        return {
            userInfo: [],
            queryuserinfoDto: {
                username:'',
                companyname:'',
                status : 1,
                index: 1,
                page: 10
            },
            loading:true,
        }
    },
    mounted() {
        this.getuserinfo();
    },
    methods: {
        //获取用户信息
        async getuserinfo() {
            this.loading = true
            let userinfo = await getUserinfo(this.queryuserinfoDto)
            this.loading = false
            for (let index = 0; index < userinfo.datalist.length; index++) {
                userinfo.datalist[index].isupdate = false
            }

            this.userInfo = userinfo


            console.log(userinfo);

        },
        resetpassword(username) {
            console.log(username);

            this.$confirm('重置密码后密码为123456', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                resetpwd(username).then((data) => {
                    this.$message({
                        message: '重置成功',
                        type: 'success'
                    })
                })
            });
            console.log("重置密码");
        },
        preupdatedata(row) {
            console.log(this.userInfo.datalist[row]);
            this.userInfo.datalist[row].isupdate = true

            console.log("修改数据");


        },
        async handleupdaterow(rowdata) {
            console.log(rowdata)

            try {
                await updateuserinfo(rowdata)
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                rowdata.isupdate = false
            } catch (msg) {
                console.log(msg);
                this.$message.error(msg);
            }
        },
        handleSizeChange(val){
            this.queryuserinfoDto.page = val
            this.getuserinfo()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val){
            this.queryuserinfoDto.index = val
            this.getuserinfo()
            console.log(`当前页: ${val}`);
        }

    },
}
</script>

<style lang="scss" scoped>
    span{
        color :rgb(60, 62, 66);
    }
</style>