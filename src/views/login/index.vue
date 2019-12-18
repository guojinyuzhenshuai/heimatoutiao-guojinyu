<template>
  <div class="login">
    <el-card class="center">
      <div class="title">
        <img src="../../assets/logo_index.png" alt />
        <el-form>
          <el-form-item>
            <el-input style="margin-top:30px" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item>
            <el-input style="width:65%; float:left" placeholder="请输入验证码"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item>
              <el-checkbox style="float:left">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item>
              <el-button type="primary" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {}
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
