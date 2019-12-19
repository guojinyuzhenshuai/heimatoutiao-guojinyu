
<template>
  <!-- <div class="layout-aside"> -->
  <div class="layout-aside">
    <div class="title">
      <img src="../assets/logo_admin.png" alt />
    </div>
    <el-menu style="width:231px ; height:100vh" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
      <el-menu-item index="2">
        <span slot="title"  style=" padding-left:20px">首页</span>
      </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <span  style="padding-left:20px">内容管理</span>
          </template>
            <el-menu-item index="1-1">发布文章</el-menu-item>
            <el-menu-item index="1-2">内容列表</el-menu-item>
            <el-menu-item index="1-3">评论列表</el-menu-item>
            <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span  style=" padding-left:20px">粉丝管理</span>
          </template>
            <el-menu-item index="3-1">图文数据</el-menu-item>
            <el-menu-item index="3-2">粉丝概况</el-menu-item>
            <el-menu-item index="3-3">粉丝画像</el-menu-item>
            <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-submenu>
      <el-menu-item index="4">
        <span slot="title"  style=" padding-left:20px">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
  <!-- </div> -->
</template>

<script>
export default {}
</script>

<style lang='less'>
.layout-aside {
  width: 230px;
  .title {
    background-color: #2e2f32;
    padding: 10px;
    text-align: center;
  }
  img {
    height: 35px;
  }
}
</style>
