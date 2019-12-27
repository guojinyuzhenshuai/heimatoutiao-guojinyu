<template>
  <div class="cover-image">
    <!-- 根据封面的images长度 组件 进行渲染 一个或者三个或者不渲染 -->
    <div v-for="(item,index) in list" :key="index" class="cover-item">
        <img src="../../assets/pic_bg.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'] // 接收属性
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .cover-item {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    margin:0px 10px;
    img{
        width: 100%;
        height: 100%;
    }
  }
}
</style>
