<template>
  <el-card>
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户id" prop="user_id">
        <el-input v-model="ruleForm.user_id"></el-input>
      </el-form-item>
      <el-form-item label="用户ip" prop="user_ip">
        <el-input v-model="ruleForm.user_ip"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="user_name">
        <el-input v-model="ruleForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="user_password">
        <el-input v-model="ruleForm.user_password"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="user_email">
        <el-input v-model="ruleForm.user_email"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="user_profile_photo">
        <el-input v-model="ruleForm.user_profile_photo"></el-input>
      </el-form-item>
      <el-form-item label="用户等级" prop="user_level">
        <el-input v-model="ruleForm.user_level"></el-input>
      </el-form-item>
      <el-form-item label="用户权限" prop="user_rights">
        <el-input v-model="ruleForm.user_rights"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="user_registration_time">
        <el-date-picker
          v-model="ruleForm.user_registration_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户生日" prop="user_birthday">
        <el-input v-model="ruleForm.user_birthday"></el-input>
      </el-form-item>
      <el-form-item label="用户年龄" prop="user_age">
        <el-input v-model="ruleForm.user_age"></el-input>
      </el-form-item>
      <el-form-item label="用户手机号" prop="user_telephone_number">
        <el-input v-model="ruleForm.user_telephone_number"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="user_nickname">
        <el-input v-model="ruleForm.user_nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加用户</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { addArticle } from '@/api/user'
export default {
  data () {
    return {
      ruleForm: {
        user_password: '',
        user_name: '',
        user_id: '',
        user_ip: '',
        user_email: '',
        user_profile_photo: '',
        user_level: '',
        user_rights: '',
        user_registration_time: '',
        user_birthday: '',
        user_age: '',
        user_telephone_number: '',
        user_nickname: '',
        // desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          addArticle(this.ruleForm).then(res => {
            // this.tableData = res.data
            console.log(res.data, 'ooooooooooooooooooooooo')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
