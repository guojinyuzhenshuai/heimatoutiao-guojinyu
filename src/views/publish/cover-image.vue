<template>
  <div class="cover-image">
    <!-- 根据封面的images长度 组件 进行渲染 一个或者三个或者不渲染 -->
    <div @click="showDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 生成的元素在body上 用visible 控制显示隐藏 -->
    <el-dialog :visible="show" @close="closeDialog">
      <!-- 选择素材组件 -->
      <!-- 建听谁就再谁的标签上写方法 -->
      <select-image @selectOneImg = receiveImg></select-image>
    </el-dialog>
  </div>
</template>

<script>
import selectImage from './select-image.vue'
export default {
  components: {
    'select-image': selectImage
  },
  props: ['list'], // 接收属性
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png'), // 将图片变成变量
      show: false, // 控制 弹层打开关闭的变量
      selectIndex: -1 // 默认下标-1
    }
  },
  methods: {
    // 接收方法
    receiveImg (img) {
      // props 是只读的 不能修改
      // 接收数据之后 发现 list 为 props 数据 要想修改 => 再次传递
      this.$emit('clickOneImg', img, this.selectIndex) // 自定义事件名这里不再强制小写
      this.closeDialog()
      // 直接调用方法就可以关闭了
    },
    showDialog (index) {
      this.selectIndex = index // 记住点击的下标
      this.show = true // 打开弹层
    },
    closeDialog () {
      this.show = false // 关闭弹层
    }
  }
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
