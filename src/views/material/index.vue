<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材列表</template>
    </bread-crumb>
    <!-- 素材 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="first">
        <!-- 全部的图片 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
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
      </el-tab-pane>
    </el-tabs>
    <!-- <button @click=show></button> -->
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
      list: []
    }
  },
  components: {
    'bread-crumb': BreadCrumb
  },

  methods: {
    // show () {
    //   this.activeName = 'first'
    // }
    showImg () {
      this.$axios({
        //   获取所有素材
        // method: 'get',
        url: '/user/images',
        params: { collect: false }
      }).then(result => {
        this.list = result.data.results
        console.log(this.list.url[0])
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
    }
  }
}
</style>
