<template>
  <!-- 卡片组件 -->
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table>
        <el-table-column prop="" label="标题" width="450"></el-table-column>
        <el-table-column prop="" label="评论状态"></el-table-column>
        <el-table-column prop="" label="总评论数"></el-table-column>
        <el-table-column prop="" label="粉丝评论数"></el-table-column>
        <el-table-column prop="" label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import BreadCrumb from '../../common/bread-crumb'
export default {
  components: {
    'bread-crumb': BreadCrumb
  }
}
</script>

<style>
</style>
