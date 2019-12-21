
<template>
  <!-- <div class="layout-aside"> -->
  <div class="layout-aside">
    <div class="title">
      <img src="../assets/logo_admin.png" alt />
    </div>
    <el-menu
      style="width:301px ; height:100vh"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">
        <span slot="title" style=" padding-left:20px" to='/home'>首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <span style="padding-left:20px">内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span style=" padding-left:20px">粉丝管理</span>
        </template>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fansphoto">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <span slot="title" style=" padding-left:20px">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
  <!-- </div> -->
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-aside {
  width: 230px;
  el-menu-item:hover {
    color: blue;
  }
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
