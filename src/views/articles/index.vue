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
      </el-col>
    </el-row>
    <!-- 主体 -->
    <el-row class='total'>
        <span>共找到1000条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板 -->
    <el-row  v-for="item in 100" :key="item" class='article-item' type='flex' justify="space-between">
        <!-- 左侧 -->
       <el-col :span="14">
           <el-row type='flex'>
             <img src="../../assets/404.png" alt="">
              <div class='info'>
                <span>年少不听李宗盛，听懂己是不惑年。</span>
                <el-tag class='tag'>标签一</el-tag>
                <span class='date'>2019-12-24 09:15:42</span>
              </div>
           </el-row>
       </el-col>
       <!-- 右侧 -->
       <el-col :span="6">
           <el-row class='right' type='flex' justify="end">
               <span><i class="el-icon-edit"></i>修改</span>
               <span><i class="el-icon-delete"></i> 删除</span>
           </el-row>
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
.total{
    margin:60px 0;
}
.article-item{
    img{
        width: 100px;
        height: 100px;
        margin-right:10px;
        border-radius: 4px
    }
.info{
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tag{
        max-width: 60px;
    }
    .date{
        color: #999;
        font-size:12px;
    }
}
}
</style>
