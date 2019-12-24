<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <el-row class="hgt">
      <el-col :span="4">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <el-radio-group v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="1">草稿</el-radio>
          <el-radio :label="2">待审核</el-radio>
          <el-radio :label="3">审核通过</el-radio>
          <el-radio :label="4">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="hgt">
      <el-col :span="4">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="hgt">
      <el-col :span="4">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="formData.dateRange"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          range-separator="-"
        ></el-date-picker>
        {{formData.dateRange}}
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import BreadCrumb from '../../common/bread-crumb'
export default {
  components: {
    'bread-crumb': BreadCrumb
  },
  data () {
    return {
      formData: {
        status: 5,
        dateRange: [],
        value: '', // 定义一个空数组接收
        channel_id: null
      },
      channels: []
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/channels',
        method: 'get'
      }).then(result => {
        this.channels = result.data.channels
        console.log(this.channels)
      })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.hgt {
  height: 60px;
  padding-left: 100px;
}
</style>
