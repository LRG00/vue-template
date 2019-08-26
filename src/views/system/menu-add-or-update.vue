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
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类型"
        >
          <a-radio-group
            @change="(e) => changeType(e.target.value)"
            v-decorator="['type', { initialValue: dataForm.type }]">
            <a-radio v-for="(item, index) in typeList" :value="item.value" :key="index">{{ item.name }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label="typeList[dataForm.type].name + '名称'"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="['name', { initialValue: dataForm.name, rules: [{required: true, message: `请输入${typeList[dataForm.type].name + '名称'}`}]}]" />
        </a-form-item>
        <a-form-item
          label="上级菜单"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-tree-select
            showSearch
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            allowClear
            treeDefaultExpandAll
            v-decorator="['parentId', { initialValue: dataForm.parentId + '', rules: [{required: true, message: '请选择上级菜单'}]}]"
          >
            <a-tree-select-node value="0" title="一级菜单" key="0-1">
              <a-tree-select-node :value="menu.menuId + &quot;&quot;" :title="menu.name" v-for="menu in menuList" :key="menu.menuId">
                <a-tree-select-node :value="item.menuId + &quot;&quot;" :title="item.name" v-for="item in menu.children" :key="item.menuId" />
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select>
        </a-form-item>
        <a-form-item
          v-if="dataForm.type === 1"
          label="菜单路由"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['url', { initialValue: dataForm.url, rules: [{required: false, message: '请输入菜单路由'}]}]" />
        </a-form-item>
        <a-form-item
          v-if="dataForm.type !== 0"
          label="授权标识"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['perms', { initialValue: dataForm.perms, rules: [{required: false, message: '请输入授权标识'}]}]" />
        </a-form-item>
        <a-form-item
          v-if="dataForm.type !== 2"
          label="排序号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number v-decorator="['orderNum', { initialValue: dataForm.orderNum, rules: [{required: false, message: '请输入排序号'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      treeExpandedKeys: [],
      typeList: [{
        value: 0,
        name: '目录'
      }, {
        value: 1,
        name: '菜单'
      }, {
        value: 2,
        name: '按钮'
      }],
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
        orderNum: '',
        perms: '',
        url: '',
        type: 0,
        parentId: ''
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add (record) {
      this.dataForm = record ? { ...record } : this.dataForm
      console.log(this.dataForm, 'dataForm')
      this.visible = true
    },
    // 点击单选切换不同的类型
    changeType (type) {
      this.dataForm.type = type
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const AddOrUpdate = this.dataForm.menuId ? 'update' : 'save'
          const parameter = { ...values, menuId: this.dataForm.menuId }
          this.$api.sys.menuAddOrUpdate(AddOrUpdate, parameter).then(res => {
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
