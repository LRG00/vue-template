<template>
  <el-card>
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类id" prop="sort_id">
        <el-input v-model="ruleForm.sort_id"></el-input>
      </el-form-item>
      <el-form-item label="分类名称" prop="sort_name">
        <el-input v-model="ruleForm.sort_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="sort_alias">
        <el-input v-model="ruleForm.sort_alias"></el-input>
      </el-form-item>
      <el-form-item label="分类描述" prop="sort_description">
        <el-input v-model="ruleForm.sort_description"></el-input>
      </el-form-item>
      <el-form-item label="父分类id" prop="parent_sort_id">
        <el-input v-model="ruleForm.parent_sort_id"></el-input>
      </el-form-item>
      <!-- <el-form-item label="评论总数" prop="article_comment_count">
        <el-input v-model="ruleForm.article_comment_count"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="article_date">
        <el-date-picker
          v-model="ruleForm.article_date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="分类" prop="sort_id">
        <el-select v-model="ruleForm.sort_id" placeholder="请选择分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="正文" prop="article_content">
        <el-input type="textarea" v-model="ruleForm.article_content"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加分类</el-button>
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
        sort_alias: '',
        sort_name: '',
        sort_id: '',
        sort_description: '',
        parent_sort_id: ''
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
