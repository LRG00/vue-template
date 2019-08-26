<template>
  <a-modal
    :title="!dataForm.unitId ? '新增' : '修改'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="公司名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', { initialValue: dataForm.name, rules: [{required: true, message: '请输入公司名称'}]}]" />
        </a-form-item>
        <a-form-item
          label="公司编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['code', { initialValue: dataForm.code, rules: [{required: true, message: '请输入公司编码'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
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
        name: '',
        code: ''
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add (record) {
      this.dataForm = record || {}
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const AddOrUpdate = this.dataForm.unitId ? 'update' : 'save'
          const parameter = { ...values, unitId: this.dataForm.unitId }
          this.$api.sys.unitAddOrUpdate(AddOrUpdate, parameter).then(res => {
            if (res.code === 0) {
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
