<template>
  <a-modal
    :title="!dataForm.roleId ? '新增' : '修改'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="角色名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['roleName', { initialValue: dataForm.roleName, rules: [{required: true, message: '请输入角色名称'}]}]" />
        </a-form-item>
        <a-form-item
          label="公司名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select v-decorator="['unitId', { initialValue: dataForm.unitId, rules: [{required: true, message: '请选择公司名称'}]}]" placeholder="请选择公司">
            <a-select-option v-for="(item, index) in unitList" :key="index" :value="item.unitId">{{ item.name }}</a-select-option>
          </a-select>
          <!-- <a-input  /> -->
        </a-form-item>
        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['remark', { initialValue: dataForm.remark, rules: [{required: true, message: '请输入备注'}]}]" />
        </a-form-item>
        <a-form-item
          label="拥有权限"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
        <a-tree
          checkable
          v-model="checkedKeys"
          :selectedKeys="selectedKeys"
          :treeData="menuIdList"
        />
        </a-form-item>
        
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  props: {
    menuIdList: {},
    unitList: {},
  },
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
      selectedKeys: [],
      checkedKeys: [],
      dataForm: {
        remark: '',
        roleName: '',
        roleId: undefined,
        menuIdList: [],
        unitId: undefined
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add (record) {
      console.log(record, 'record', this.dataForm)
      if (record && record.roleId) {
        this.dataForm = {...record}
        this.$api.sys.getRoleOne(record.roleId).then(res => {
          this.checkedKeys = res.role.menuIdList
        })
      }
      this.checkedKeys = []
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const AddOrUpdate = this.dataForm.roleId ? 'update' : 'save'
          const parameter = { ...values, roleId: this.dataForm.roleId, menuIdList: this.checkedKeys }
          this.$api.sys.roleAddOrUpdate(AddOrUpdate, parameter).then(res => {
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
      this.dataForm = {}
      this.form.resetFields()
    }
  }
}
</script>
