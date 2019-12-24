<template>
  <!-- 面包屑的内容 -->
  <el-breadcrumb separator=">">
    <!-- separator 可以更改他们的连接符 -->
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <!-- 具名插槽 -->
      <slot name="title"></slot>
      <!-- 这个具名插槽 就是 在别的vue中注册 用slot标签绑定样式 name属性建立关联
           然后在另一个标签上用slot属性 = 刚才name的关联名 可以吧 里面的属性传给前面的页面 完全覆盖 -->
      <!-- 这是引入的界面所写的格式 -->
      <!-- <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb> -->
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
