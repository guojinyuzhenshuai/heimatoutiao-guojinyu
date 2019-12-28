<template>
  <el-card v-loadind="loading">
    <bread-crumb slot="header">
      <template slot="title">账户管理</template>
    </bread-crumb>
    <el-upload class="head-upload" action :show-file-list="false" :http-request="uploadImg">
      <img  :src="formData.photo ? formData.photo : defaultImg" alt />
    </el-upload>
    <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left:100px" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" style="width:30%" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus.js'
import BreadCrumb from '../../common/bread-crumb'
export default {
  components: {
    'bread-crumb': BreadCrumb
  },
  data () {
    return {
      loading: false,
      formData: {
        // 定义一个表单来接收数据
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: '',
        id: ''
      },
      rules: {
        name: [{ require: true, message: '用户名不能为空' },
          { max: 8, min: 2, message: '用户名长度为2-8' }],
        email: [{ require: true, message: '邮箱不能为空' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不对'
          }],
        mobile: [{ require: true, message: '手机号不能为空' }]
      },
      defaultImg: require('../../assets/404.png')
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let data = new FormData() // 实例化对象
      data.append('photo', params.file) // 参数
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then((result) => {
        this.formData.photo = result.data.photo
        this.loading = false
      })
    },
    saveUserInfo () {
      this.$refs.myForm.validate((isOK) => {
        // 调用保存方法
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then((result) => {
            this.$message({
              type: 'success',
              message: '验证成功'
            })
            // 告诉头部组件 我更新了 你也要更新
            // this.$emit()
            eventBus.$emit('updateUserInfoSuccess') // 触发一个自定义事件
          })
        }
      })
    },
    getUserInfo () {
      this.$axios({
        url: `/user/profile`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload {
  position: absolute;
  right: 300px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
