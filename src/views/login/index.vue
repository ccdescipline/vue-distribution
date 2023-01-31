<template>
  
  <div class="login-container">
    <div id="particles"></div>
    <transition enter-active-class="animate__animated animate__fadeInUp">
      <el-form v-if="!isregister" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"
        auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title" style="color: black;">Login Form</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
            
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
            tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
            placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin">Login</el-button>

        <div class="tips">
          <!-- <span style="margin-right:20px;">username: admin</span>
          <span> password: any</span> -->
          <span @click="Onpreregister" style="color: black;"><a>没有账号？ 这里注册</a></span>
        </div>
      </el-form>
    </transition>
    <transition enter-active-class="animate__animated animate__fadeInUp">
      <el-form v-if="isregister" ref="registerForm" class="login-form" :rules="registerRules" :model="registerForm"
        >
        <div id="register">
          <div class="title-container">
            <h3 class="title" style="color: black;">用户注册</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="registerForm.username" placeholder="用户名" name="username" type="text"
              tabindex="1" auto-complete="on" />
          </el-form-item>

          <el-form-item prop="companyname">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="registerForm.companyname" placeholder="公司名" name="companyname" type="text" tabindex="1"
              auto-complete="on" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="registerForm.password" placeholder="密码" name="password" type="text" tabindex="1"
              auto-complete="on" />
          </el-form-item>

          <el-form-item prop="Repassword">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="registerForm.Repassword" placeholder="确认密码" name="Repassword" type="text" tabindex="1"
              auto-complete="on" />
          </el-form-item>

          <el-form-item prop="phone">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="registerForm.phone" placeholder="手机号" name="phone" type="text" tabindex="1"
              auto-complete="on" />
          </el-form-item>

          <el-form-item prop="email">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="registerForm.email" placeholder="邮箱" name="email" type="text" tabindex="1"
              auto-complete="on" />
          </el-form-item>

          <el-form-item prop="sex">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-select v-model="registerForm.sex" placeholder="请选择">
              <el-option label="男" :value="1">男</el-option>
              <el-option label="女" :value="2">女</el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="role">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-select v-model="registerForm.roleid" placeholder="请选择">
              <el-option v-for="(item, index) in roleinfo" :key="index" :value="item.roleid" :label="item.RoleName">
                </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="Onregister"> 注册
          </el-button>
        </div>

      </el-form>
    </transition>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getroleinfo, register,nameIsrepeat } from '@/api/user'
//import { MessageBox, Message } from 'element-ui'
import {resetRouter} from '@/router/index.js'

export default {
  name: 'Login',
  mounted() {
    particlesJS.load('particles', '/particles.json', function () {
        console.log('callback - particles.js config loaded')
    })
    resetRouter();

  },
  data() {
    let _this = this

    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    const validatePhone = function (rule, value, callback) {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    const validateEmail = function (rule, value, callback) {
      if (
        !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          value
        )
      ) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }

    const validateRepassword = function(rule, value, callback) {
      if (value !== _this.registerForm.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }

    const validateRegisterName = function(rule, value, callback) {
      nameIsrepeat(value).then(data => {
        if (!data) {
          callback('用户名已经注册！')
        } else {
          callback()
        }
      })
    }

    return {
      loginForm: {
        // username: 'FoodMarket',
        // password: '123456'

        // username: 'Merchant',
        // password: '123456'

        username: 'Merchant',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      isregister: false,
      registerForm: {
        /*注册payload数据*/
        username: 'caochuang',
        password: '123456',
        Repassword: '123456',
        email: '123456789@email.com',
        phone: '13146464646',
        sex: 1,
        roleid: 1,
        companyname: '中国工商银行'
      },
      registerRules: {
        username: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' },
          { validator: validateRegisterName }
        ],
        companyname: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        Repassword: [
          { required: true, trigger: 'blur', validator: validateRepassword }
        ]
      },
      roleinfo: [
        // {
        //   roleId: '19888802-68c7-11ed-813f-3024323e00de',
        //   roleName: '供应商'
        // },
        // {
        //   roleId: '1989741c-68c7-11ed-813f-3024323e00de',
        //   roleName: '经销商'
        // }
      ]
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
     isregister: async function (newdata) {
      if (newdata) {
        
      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            console.log('登录成功')
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Onregister() {
      this.$refs.registerForm.validate(valid => {
        if (!valid) {
          return
        }

        console.log(this.registerForm)

        register(this.registerForm).then((data) => {
          this.$message({
            message: data,
            type: 'success'
          })
          //注册成功
          this.isregister = false
          this.loginForm.username = this.registerForm.username
          this.loginForm.password = this.registerForm.password
        }).catch((data) => {
          this.$message.error(data)
        })
      })
    },
    async Onpreregister(){
      console.log('开始注册')

        //获取角色信息
        let res =  await getroleinfo()
        console.log(res)
        this.roleinfo = res
        this.registerForm.roleid = res[0].roleid

        console.log('this.registerForm.roleid',this.registerForm.roleid);
        
        this.isregister = true;

    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: black;
$cursor: white;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 35px;background-color:aliceblue; color:black;border-radius: 5px;box-shadow: 0px 0px 10px gray;margin-top: 100px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.showregister-leave-to {
  transition: width 2s;
}

.showregister-enter {
  // 设置透明度，0表示隐藏，1表示显示，我这里解释的并不是很对，这是css基础知识，大家可以在w3C中查找资料了解一下
  width: 1000px;

}

.showregister-enter-to {
  // 设置透明度，0表示隐藏，1表示显示，我这里解释的并不是很对，这是css基础知识，大家可以在w3C中查找资料了解一下

  width: 100px;
}

// 进入(显示)过程中和离开(隐藏)过程中的效果
.showregister-enter-active {
  transition: width 2s;
}

.showregister-leave-active {
  // 设置过渡持续时间
  //transition: all 3s;
  transition: width 2s;
}

#particles{
      position: absolute;
      left:2%;
      width: 96%;
}
</style>
