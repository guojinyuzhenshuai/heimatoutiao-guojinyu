<template>
  <!-- 卡片组件 -->
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
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
          <el-button type="text" @click="openOrClose(obj.row)">{{obj.row.comment_status? '打开评论' : '关闭评论'}}</el-button>
        </template>

        <!-- <slot :row="name" :column="column" :$index="index" :store="store">{{obj.row}}</slot> -->
      </el-table-column>
    </el-table>
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
      statu: ''
    }
  },
  methods: {
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // console.log(this.$comfirm)
      this.$confirm(`您是否确定要${mess}评论吗`).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id
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
        params: { response_type: 'comment' }
      }).then(result => {
        // console.log(result.data.results)
        this.list = result.data.results // 获取评论数据
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
    this.getComment()
  }
}
</script>

<style>
</style>
