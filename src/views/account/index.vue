<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户管理</template>
    </bread-crumb>
    <el-upload class="head-upload" action :show-file-list="false">
      <img :src="formData.photo ? formData.photo : defaultImg" alt />
    </el-upload>
    <el-form style="margin-left:100px" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.mobile" style="width:30%" disabled="ture"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存信息</el-button>
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
      formData: {
        // 定义一个表单来接收数据
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: '',
        id: ''
      },
      defaultImg: require('../../assets/404.png')
    }
  },
  methods: {
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
