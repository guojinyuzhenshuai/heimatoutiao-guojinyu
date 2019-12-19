<template>
  <el-container>
    <el-aside>
      <layout-aside>
        <!-- 侧边栏 -->
      </layout-aside>
    </el-aside>
    <el-container>
      <el-header style="background-color:blue">头顶部分</el-header>
      <el-main style="background-color:yellow">主要内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>
</style>
