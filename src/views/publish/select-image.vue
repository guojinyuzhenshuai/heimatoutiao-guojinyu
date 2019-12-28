<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material" class="imgmaterial">
      <div v-for="item in list" :key="item.id" class="imgBox">
        <img @click="clickImg(item.url)" :src="item.url" alt />
        <!-- {{item.url}} -->
      </div>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="center" align="middle">
        <el-pagination background layout="prev, pager, next"
        :total="page.total"
        :page-size='page.pageSize'
        :current-page='page.currentPage'
        @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload action="" class="upload" :http-request="uploadImg" :show-file-list="false">
        <!-- 放置一个上传组件 -->
        <i class="el-icon-plus"></i>

      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选择素材库
      list: [],
      page: {
        total: 0, // 总条目数
        pageSize: 8, // 每页显示条目个数，支持 .sync 修饰符
        currentPage: 1 // 当前页数，支持 .sync 修饰符
      }
    }
  },
  methods: {
    uploadImg (params) {
      // 上传图片
      let data = new FormData() // 实例化对象
      data.append('image', params.file) // 添加文件参数
      console.log(data)

      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then((result) => {
        // this.$emit('selectOneImg', result.data.url)
      })
    },
    // 点击图片触发
    clickImg (url) {
      // 需要将url地址传出去 $emit 自定义事件 => 携带参数
      this.$emit('selectOneImg', url) // 自定义事件名这里不再强制小写
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImage()
    },

    getAllImage () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数
      })
    }
  },
  created () {
    this.getAllImage()
  }
}
</script>

<style lang="less" scoped>
.imgmaterial {
  display: flex;
  flex-wrap: wrap;
  .imgBox {
    width: 150px;
    height: 150px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload{
  display: flex;
  justify-content: center;
  // width: 25px;
  // height: 250px;
  i{
    font-size: 50px;
    display: block;
    margin: 20px auto;
    padding: 60px;
    border: 1px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
