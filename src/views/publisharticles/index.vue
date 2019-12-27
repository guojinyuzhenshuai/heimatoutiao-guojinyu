<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
      <el-form-item prop="title" label="标题" class="publishstyle">
          <el-input v-model="formData.title" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容" class="publishstyle">
          <el-input v-model="formData.content"  type="textarea" :formel-forms="10"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="封面" class="publishstyle" >
          <el-radio-group v-model="formData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道"  class="publishstyle">
            <el-select v-model="formData.channel_id">
              <el-option v-for="item in channels"
            :key="item.id.toString()"
            :label="item.name"
            :value="item.id"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticles(false)">发布</el-button>
        <el-button @click="publishArticles(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
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
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 1:自动 0-无图 1-1张 3-3张
          images: []// 存储的图片地址
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 表单校检规则
        title: [{ required: true, message: '标题内容不能为空' }, {
          min: 5, max: 30, message: '标题长度需要在5到30字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 有参数修改
      } else {
        // 没有参数 => 发布
        this.formData =
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 1:自动 0-无图 1-1张 3-3张
            images: []// 存储的图片地址
          }
        }
      }
    }
  },
  methods: {
    getArticlesById (articleId) {
      this.$axios({
        url: `articles/${articleId}`
      }).then((result) => {
        this.formData = result.data
        console.log(this.formData)
      })
    },
    publishArticles (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          let { articleId } = this.$route.params // 回去动态路由参数

          if (articleId) {
            // 如果存在 就修改文章
            this.$axios({
              url: `/articles/${articleId}`,
              method: 'put',
              params: draft,
              data: this.formData
            }).then(() => {
              this.$router.push('/home/articles')
            })
          } else {
            // 发布文章
            this.$axios({
              url: '/articles',
              method: 'post',
              params: {
                draft
              },
              data: this.formData
            }).then(() => {
              this.$router.push('/home/articles')
            })
          }
        }
      })
    },
    getArticles () {
      this.$axios({
        url: '/channels',
        method: 'get'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getArticles()
    // 判断有无Id 有Id就是修改 没有Id就是发布
    let { articleId } = this.$route.params // 回去动态路由参数

    articleId && this.getArticlesById(articleId)
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
