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
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">草稿</el-radio>
          <el-radio :label="3">待审核</el-radio>
          <el-radio :label="4">审核通过</el-radio>
          <el-radio :label="5">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="hgt">
      <el-col :span="4">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select></el-select>
      </el-col>
    </el-row>
    <el-row class="hgt">
      <el-col span="4">
        <span>时间选择</span>
      </el-col>
      <el-col span="18">
        <el-time-picker
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
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
      radio: {}
    }
  }
}
</script>

<style lang='less' scoped>
.hgt {
  height: 60px;
  padding-left: 100px;
}
</style>
