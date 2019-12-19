<template>
  <div class="layout-header">
    <!-- 头部组建 -->
    <el-row type="flex" justify="space-between" align="middle">
      <!-- 左侧 -->
      <el-col :span="12" style="background-color:red">
        <span class="el-icon-s-fold"></span>
        江苏传智播客教育科技股份有限公司
      </el-col>
      <!-- 右侧 -->
      <el-col :span="12" style="background-color:yellow; float:right">
        <div style="float:right">
            <span>消息</span>
            <img :src="userInfo.photo ? userInfo.photo : defaultIng" alt="">
            <span style="margin-right:5px">{{ this.userInfo.name }}</span>
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
      userInfo: {},
      defaultIng: require('../assets/avatar.jpg') // 用户信息
    }
  },
  created () {
    let token = window.localStorage.getItem('user-token')
    console.log(token)

    this.$axios({
      url: '/user/profile',
      // headers 参数
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      this.userInfo = res.data.data // 获取用户个人信息
      console.log(res.data.data)
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
