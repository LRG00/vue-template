<template>
  <el-card>
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标签id" prop="label_id">
        <el-input v-model="ruleForm.label_id"></el-input>
      </el-form-item>
      <el-form-item label="标签名称" prop="label_name">
        <el-input v-model="ruleForm.label_name"></el-input>
      </el-form-item>
      <el-form-item label="标签别名" prop="label_alias">
        <el-input v-model="ruleForm.label_alias"></el-input>
      </el-form-item>
      <el-form-item label="标签描述" prop="label_description">
        <el-input v-model="ruleForm.label_description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加标签</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { addArticle } from '@/api/tag'
export default {
  data () {
    return {
      ruleForm: {
        label_alias: '',
        label_name: '',
        label_id: '',
        label_description: ''
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
