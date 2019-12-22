<template>
  <el-container>
    <el-aside>
      <layout-aside style="width:100%; height:100%; overflow: hidden">
        <!-- 侧边栏 -->
      </layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header style="height:50px"></layout-header>
      </el-header>
      <el-main style="background-color:yellow">
        <!-- 主要内容 -->
        <bread-crumb></bread-crumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/layout-aside'
import layoutHeader from '../../components/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
