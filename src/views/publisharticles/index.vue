<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题" class="publishstyle">
        <el-input v-model="formData.title" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容" class="publishstyle">
        <quill-editor
          style="height:400px"
          v-model="formData.content"
          type="textarea"
          :formel-forms="10"
        ></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" class="publishstyle" style="margin-top:100px">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <!-- @change="changeType" -->
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- 放置一个封面组件   这里用到了一个 父组件 给子组件传值-->
        <cover-image @clickOneImg="receiveImg" :list=formData.cover.images></cover-image>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道" class="publishstyle">
        <el-select v-model="formData.channel_id">
          <el-option
            v-for="item in channels"
            :key="item.id.toString()"
            :label="item.name"
            :value="item.id"
          ></el-option>
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
import CoverImage from '../publish/cover-image.vue'

export default {
  components: {
    'bread-crumb': BreadCrumb,
    'cover-image': CoverImage
  },
  data () {
    return {
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 1:自动 0-无图 1-1张 3-3张
          images: [] // 存储的图片地址
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 表单校检规则
        title: [
          { required: true, message: '标题内容不能为空' },
          {
            min: 5,
            max: 30,
            message: '标题长度需要在5到30字符之间'
          }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 有参数修改
        this.getArticlesById(to.params.articleId)
      } else {
        // 没有参数 => 发布
        this.formData = this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 1:自动 0-无图 1-1张 3-3张
            images: [] // 存储的图片地址
          }
        }
      }
    }
    // 监控嵌套对象的中值
    // 'formData.cover.type': function () {
    // // this指向 组件实例
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     // 无图模式
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     // 单图模式
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     // 三图模式
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    receiveImg (img, index) {
      // debugger
      // 接收到数据之后 修改image数组 => 但是image 是个数组 ['','','']
      // 有地址 有索引 就可以修改images了
      // this.formData.cover.images[index] = img // 直接修改数据 这种方式 需要再次点击关闭才可以显示 所以这种方式 是不可以的
      // Vue 有响应式原理 响应式数据=> 数据发生变化时 (必须能被Vue监控到) => 视图变化
      // 我们可以给images 重新赋值一个新数组
      // 我们的数组 => 新数组 => 就会触发响应式视图更新 或者使用这些方法 push / pop / shift / unshift / slice
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     return img
      //   } else {
      //     return item
      //   }
      // })
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? img : item)
      // 还有最后一步 点击时触发关闭
    },
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        // 单图模式
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        // 三图模式
        this.formData.cover.images = ['', '', '']
      }
    },
    getArticlesById (articleId) {
      this.$axios({
        url: `articles/${articleId}`
      }).then(result => {
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

<style lang="less" scoped>
.publishstyle {
  // height: 130px;
  margin-left: 100px;
  margin-top: 60px;
}
</style>
