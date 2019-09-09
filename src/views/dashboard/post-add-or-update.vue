<template>
  <a-modal
    :title="!dataForm.article_id ? '新增' : '修改'"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="标题"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['article_title', { initialValue: dataForm.article_title, rules: [{required: true, message: '标题'}]}]" />
        </a-form-item>
        <a-form-item
          label="作者"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['user_id', { initialValue: dataForm.user_id, rules: [{required: true, message: '作者'}]}]" />
        </a-form-item>
        <a-form-item
          label="浏览量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['article_views', { initialValue: dataForm.article_views, rules: [{required: true, message: '浏览量'}]}]" />
        </a-form-item>
        <a-form-item
          label="喜欢"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['article_like_count', { initialValue: dataForm.article_like_count, rules: [{required: true, message: '喜欢'}]}]" />
        </a-form-item>
        <a-form-item
          label="评论总数"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['article_comment_count', { initialValue: dataForm.article_comment_count, rules: [{required: true, message: '评论总数'}]}]" />
        </a-form-item>
        <a-form-item
          label="日期"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-date-picker v-decorator="['article_date', { initialValue: this.moment(dataForm.article_date, 'YYYY/MM/DD'), rules: [{required: true, message: '日期'}]}]" />
        </a-form-item>
        <a-form-item
          label="正文"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <div class="components-container">
            <div>
              <tinymce v-model="dataForm.article_content" :height="300" />
            </div>
            <div class="editor-content" v-html="dataForm.article_content" />
          </div>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import {formatDate} from '@/utils/data'
import moment from 'moment';
export default {
  components: { Tinymce },
  data () {
    return {
      moment,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      dataForm: {
        user_id: '',
        article_title: '',
        article_views: 0,
        article_comment_count: 0,
        article_like_count: 0,
        article_date: null,
        article_content: ''
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add (record) {
      console.log( this.moment(record.article_date, '2015/01/01')  )
      this.dataForm = record || {}
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const AddOrUpdate = this.dataForm.article_id ? 'update' : 'add'
          const parameter = { ...values, article_content: this.dataForm.article_content, article_id: this.dataForm.article_id }
          this.$api.sys.postAddOrUpdate(AddOrUpdate, parameter).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功')
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
            }
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>