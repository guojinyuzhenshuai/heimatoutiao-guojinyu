<template>
  <!-- 卡片组件 -->
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" v-loading="loading">
      <!-- 表头 -->
      <el-table-column prop="title" label="标题" width="450"></el-table-column>
      <!-- 格式化属性 -->
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <!-- {{obj.row.comment_status}} -->
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrClose(obj.row)"
          >{{obj.row.comment_status? '打开评论' : '关闭评论'}}</el-button>
        </template>

        <!-- <slot :row="name" :column="column" :$index="index" :store="store">{{obj.row}}</slot> -->
      </el-table-column>
    </el-table>
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
// import { url } from 'inspector'
export default {
  components: {
    'bread-crumb': BreadCrumb
  },
  data () {
    return {
      list: [],
      // statu: ''
      page: {
        // 设置一个page对象 专门控制分页
        total: 0, // 数据总条数
        pageSize: 10, // 每页显示条目个数
        currentPage: 1 // 当前页码 默认第一页
      },
      loading: false // 加载状态
    }
  },
  methods: {
    // 页面 改变事件
    changePage (newPage) {
      // 修改当前 页码
      this.page.currentPage = newPage
      this.getComment()
    },
    openOrClose (row) {
      console.log(row)
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否确定要${mess}评论吗`).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment()
        })
      })
    },
    getComment () {
      // axios 默认是get类型
      // query 参数 / 路由参数 get参数 我们一般要给axios 有一个属性叫 params
      // body 参数 给 data
      // 身份信息 headers
      this.$axios({
        url: './articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        // console.log(result.data.results)
        this.list = result.data.results // 获取评论数据
        this.page.total = result.data.total_count
        this.loading = false
        // this.page.pageSize = result.data.page
        // this.page.currentPage = result.data.per_page
      })
    },
    formatterBool (row, column, cellValue, index) {
      // row 行
      // column 列
      // cellValue 当前单元格
      // index 当前下标
      //   debugger
      // console.log(cellValue)
      if (cellValue) {
        return '正常'
      } else {
        return '关闭'
      }
      //   return 123456
    }
  },

  created () {
    this.loading = true

    this.getComment()
  }
}
</script>

<style>
</style>
