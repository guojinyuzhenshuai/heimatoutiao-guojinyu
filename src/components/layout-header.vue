<template>
  <div class="layout-header">
    <!-- 头部组建 -->
    <el-row type="flex" justify="space-between" align="middle">
      <!-- 左侧 -->
      <el-col :span="8" style="background-color:red">
        <span class="el-icon-s-fold"></span>
        江苏传智播客教育科技股份有限公司
      </el-col>
      <!-- 右侧 -->
      <el-col :span="4" style="background-color:yellow; float:right">
        <div style="float:right">
            <span>消息</span>
            <img src="../assets/avatar.jpg" alt="">
            <span style="margin-right:5px">用户名</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item>地址</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  created () {
    let token = window.localStorage.getItem('Application')

    this.$axios({
      url: '/user/profile',
      // headers 参数
      headers: {
        Application: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header{
    height: 60px;
    line-height: 50px;
    img{
        height: 30px;
        border-radius: 50%;
        line-height: 30px;
        margin-right: 10px;
    }
}
</style>
