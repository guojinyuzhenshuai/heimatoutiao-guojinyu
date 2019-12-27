<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-row style="margin-left:50px" label-width="100px">
      <el-row class="publishstyle">
        <el-col :span="1">标题</el-col>
        <el-col :span="8">
          <el-input placeholder="文章名称"></el-input>
        </el-col>
      </el-row>
      <el-row class="publishstyle">
        <el-col :span="1">内容</el-col>
        <el-col :span="12">
          <el-input type="textarea" :rows="10"></el-input>
        </el-col>
      </el-row>
      <el-row class="publishstyle">
        <el-col span="1">封面</el-col>
        <el-col span="12">
          <el-radio-group v-model="radio">
            <el-radio>单图</el-radio>
            <el-radio>三图</el-radio>
            <el-radio>无图</el-radio>
            <el-radio>自动</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="publishstyle">
        <el-col span="1">频道</el-col>
        <el-col span="12">
            <el-select>
              <el-option v-for="item in channels"
            :key="item.id.toString()"
            :label="item.name"
            :value="item.id"></el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-row>
          <el-col></el-col>
          <el-col></el-col>
      </el-row>
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

<style lang="less" spoced>
.publishstyle {
  // height: 130px;
  margin-left: 100px;
  margin-top: 60px
}
</style>
