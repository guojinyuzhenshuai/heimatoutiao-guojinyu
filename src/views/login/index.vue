<template>
  <div class="login">
    <el-card class="center">
      <div class="title">
        <img src="../../assets/logo_index.png" alt />
        <!-- 登录表单 表单容器 el-form 需要绑定model属性 rules 属性绑定 验证规则对象 -->
        <el-form ref="myForm" :model="loginForm" :rules="loginRules">
          <!-- 表单域 el-form-item => 一行 => 效验 => prop => 要检验的字段名 -->
          <el-form-item prop="mobile">
            <!-- 放置具体的组件 登录手机号 v-model 双向绑定数据对象 -->
            <el-input style="margin-top:30px" placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <!-- 表单域 -->
            <el-input style="width:65%; float:left" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="check">
            <el-checkbox style="float:left" v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        modile: '',
        code: '',
        check: false
      },
      loginRules: {
        // 验证规则 验证登录表单的 key(字段名):value(数组)
        // required true -> 必填
        mobile: [
          { required: true, message: '请输入你的手机号' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '您输入的格式有误'
          }
        ],
        code: [
          { required: true, message: '请输入你的验证码' },
          {
            pattern: /^\d{6}$/,
            message: '你输入的验证码格式不正确'
          }
        ],
        check: [
          {
            validator: function (rule, value, callback) {
              //   console.log(value)

              // rule 当前的规则 没什么用
              // value 指的就是我们要校检的字段的值
              if (value) {
                // 认证校检通过
                callback() // 直接执行callback 认为通过
              } else {
                // 认证校检不通过 要提示信息
                callback(new Error('我又吐了'))
              }
            }
          }
        ]
        // check: [
        //   { required: true, message: '我吐了' }
        // ]
      }
    }
  },
  methods: {
    submitLogin () {
      // 校验整个表单的规则
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          // console.log(this.loginForm)

          // console.log('校检成功')
          this.$axios({
            url: '/authorizations', // 请求地址
            method: 'post',
            data: this.loginForm
          })
            .then(result => {
              // console.log(result)
              window.localStorage.setItem('user-token', result.data.token) // 前端缓存令牌
              this.$router.push('/home') // 登陆成功 跳转到主页
            })
            .catch(error => {
              this.$message({
                message: '您的验证码不正确',
                type: 'warning'
              })
              console.log(error)
            })
        } else {
          console.log('校检失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 写上 scoped 这个样式就会只对自己的页面起作用
.login {
  height: 100vh;
  background-image: url("../../assets/login_bg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .center {
    width: 440px;
    height: 350px;
    background-color: #fff;
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
