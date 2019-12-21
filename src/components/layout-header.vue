<template>
  <div class="layout-header">
    <!-- 头部组建 -->
    <el-row type="flex" justify="space-between">
      <!-- 左侧 -->
      <el-col :span="12">
        <span class="el-icon-s-fold"></span>
        江苏传智播客教育科技股份有限公司
      </el-col>
      <!-- 右侧 -->
      <el-col :span="12" style="float:right">
        <div style="float:right">
          <span>消息</span>
          <img :src="userInfo.photo ? userInfo.photo : defaultIng" alt />
          <span style="margin-right:5px">{{ this.userInfo.name }}</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">个人信息</el-dropdown-item>
              <el-dropdown-item command="2">git地址</el-dropdown-item>
              <el-dropdown-item command="3">退出</el-dropdown-item>
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
      // console.log(res.data.data)
    })
  },
  methods: {
    handleCommand (command) {
      this.$message(command)
      if (command === '3') {
        window.localStorage.removeItem('user-token')
        window.location.href = '/login'
        this.$router.push('/login')
      } else if (command === '2') {
        window.location.href =
          'https://github.com/guojinyuzhenshuai/heimatoutiao-guojinyu'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  line-height: 60px;
  img {
    height: 30px;
    border-radius: 50%;
    line-height: 30px;
    margin-right: 10px;
    vertical-align: middle;
  }
}
</style>
