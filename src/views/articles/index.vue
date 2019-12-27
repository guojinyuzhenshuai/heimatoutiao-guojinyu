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
        <el-radio-group @change="changeCondition" v-model="formData.status">
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
          <el-option
            v-for="item in channels"
            :key="item.id.toString()"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="hgt">
      <el-col :span="4">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          range-separator="-"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 主体 -->
    <el-row class="total">
      <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板 -->
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <!-- 左侧 -->
      <el-col :span="14">
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[1] : ''" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span @click="toPublish(item.id)" class="node">
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="removeArticles(item.id)" class="node">
            <i class="el-icon-delete"></i> 删除
          </span>
        </el-row>
      </el-col>
    </el-row>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" align="middle">
      <el-pagination
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        background
        layout="prev, pager, next"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
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
      page: {
        currentPage: 1, // 当前页数
        total: 100, // 总页数
        pageSize: 10 // 每页显示数目
      },
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
    toPublish (id) {
      this.$axios({
        url: '/comments/status',
        method: 'put',
        params: { id }
      })
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    removeArticles (id) {
      this.$confirm('您是否要删除这个文章?').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除文章成功!'
          })
          this.getConditionArticle()
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    // 改变条件
    changeCondition () {
      // 这里 我们来组装我们的条件
      //   alert(this.formData.status)
      this.page.currentPage = 1// 强制将当前的页码回到第一页
      this.getConditionArticle()
      // 最新状态
    },
    getConditionArticle () {
      let params = {
        page: this.page.currentPage, // 切换状态 默认
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 5代表全部
        channel_id: this.formData.channel_id, // 频道
        begin_pubdate: this.formData.dateRange.length
          ? this.formData.dateRange[0]
          : null, // 起始时间
        end_pubdate:
          this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 结束时间

      }
      this.getArticleAll(params)
    },
    getArticleAll (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        // debugger
        this.list = result.data.results
        this.page.total = result.data.total_count

        console.log(result)
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
.total {
  margin: 60px 0;
}
.article-item {
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    border-radius: 4px;
  }
  .info {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tag {
      max-width: 60px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
}
.node{
  cursor: pointer
}
</style>
