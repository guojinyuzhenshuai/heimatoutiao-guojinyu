<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材列表</template>
    </bread-crumb>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="first">
        <!-- 全部的图片 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="space-around" align="middle">
              <!-- 根据图片收藏状态来决定图标的颜色 -->
              <i @click="collectOrCancel(item)" :style="{color: item. is_collected?'red':''}" class="el-icon-star-on"></i>
              <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <!-- <img src="{{list.url}}" alt=""> -->
        <!-- <el-row type="flex" justify="center" align="middle">
            <el-col span="4">1</el-col>
        </el-row>-->
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="second">
        <!-- 收藏的图片 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="space-around" align="middle"></el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="点击上传">
        <el-upload
        :show-file-list="false"
        :http-request="uploadImg"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
    <!-- <button @click=show></button> -->
    <el-row type="flex" justify="center" align="middle" style="height:40px">
      <el-pagination
        :page-size="page.pageSize"
        :total="page.total"
        :current-page="page.currentPage"
        @current-change="changePage"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import BreadCrumb from '../../common/bread-crumb'
// import { listeners } from 'cluster'
// import axios from 'axios'

export default {
  data () {
    return {
      activeName: 'first', // 默认选中全部
      list: [],
      page: {
        // 设置一个page对象 专门控制分页
        total: 0, // 数据总条数
        pageSize: 12, // 每页显示条目个数
        currentPage: 1 // 当前页码 默认第一页
      }
    }
  },
  components: {
    'bread-crumb': BreadCrumb
  },

  methods: {
    delMaterial (id) {
      this.$confirm('你确定要删除么').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.showImg()
        })
      })
    },
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: { collect: !row.is_collected
        }
      }).then(() => {
        // console.log(result)
        this.showImg()
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.showImg()
    },
    changeTab () {
      this.page.currentPage = 1

      this.showImg()
    },
    // show () {
    //   this.activeName = 'first'
    // }
    showImg () {
      this.$axios({
        //   获取所有素材
        // method: 'get',
        url: '/user/images',
        params: {
          collect: this.activeName === 'second',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.page.total = result.data.total_count
        this.list = result.data.results
        // console.log(this.list.url[0])
      })
    },
    uploadImg (params) {
      let form = new FormData()
      form.append('image', params.file)// 将文件添加到form中
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: form// 上传 form
      }).then((result) => {
        // alert(result)
      })
    }
  },
  created () {
    this.showImg()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      font-size: 20px;
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 30px;
      margin-left: -20px;
      i{
        cursor: pointer;
      }
    }
  }
}
</style>
