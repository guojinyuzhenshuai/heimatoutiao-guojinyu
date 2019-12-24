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
          <el-option v-for="item in channels" :key="item.id.toString()" :label="item.name" :value="item.id"></el-option>
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
    <el-row  v-for="item in list" :key="item.id.toString()" class='article-item' type='flex' justify="space-between">
        <!-- 左侧 -->
       <el-col :span="14">
           <el-row type='flex'>
             <img :src="item.cover.images.length ? item.cover.images[1] : ''" alt="">
              <div class='info'>
                <span>{{item.title}}</span>
                <el-tag class='tag' :type='item.status | filterType'>{{item.status | filterStatus}}</el-tag>
                <span class='date'>{{item.pubdate}}</span>
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
      channels: [],
      list: []
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    getArticleAll () {
      this.$axios({
        url: '/articles'
      }).then((result) => {
        // debugger
        this.list = result.data.results
        console.log(result.data.results)
      })
    },
    getArticles () {
      this.$axios({
        url: '/channels',
        method: 'get'
      }).then(result => {
        this.channels = result.data.channels
        // console.log(this.channels)
      })
    }
  },
  created () {
    this.getArticleAll()
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
