<template>
  <a-card class="unit-card" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="">
              <a-input v-model="queryParam.username" placeholder="用户名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="">
              <a-select v-model="queryParam.unitId" placeholder="请选择公司">
                <a-select-option v-for="(item, index) in unitList" :key="index" :value="item.unitId">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span>
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
          <a-form-item style="float:right;margin-right:10px">
            <a-button style="margin-left: 8px" type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
            <a-button style="margin-left: 8px" type="danger" @click="deleteHandle()" :disabled="selectedRows.length <= 0">批量删除</a-button>
          </a-form-item>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="userId"
      :columns="columns"
      :data="loadData"
      :rowSelection="options.rowSelection"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.createModal.add(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
        <template>
          <a @click="deleteHandle(record.unitId)">删除</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CreateForm from './user-add-or-update'
export default {
  name: 'Unit',
  components: {
    STable,
    CreateForm
  },
  data () {
    return {
      unitList: [],
      // 查询参数
      queryParam: { username: '', unitId: undefined },
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'userId'
        },
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        {
          title: '所属公司',
          dataIndex: 'unitName'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const { pageNo, pageSize } = parameter
        return this.$api.sys.getUserList(Object.assign({ page: pageNo, limit: pageSize }, this.queryParam))
          .then(res => {
            const { currPage, pageSize, totalCount, totalPage, list } = res.page
            return { data: list, pageNo: currPage, pageSize, totalCount, totalPage }
          })
      },
      // custom table alert & rowSelection
      selectedRowKeys: [],
      options: {
        rowSelection: {
          onChange: this.onSelectChange
        }
      },
      selectedRows: []
    }
  },
  created () {
    this.$api.sys.getUnitList()
      .then(res => {
        this.unitList = res.page.list
      })
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    // 删除
    deleteHandle (id) {
      const ids = id ? [id] : this.selectedRows.map(item => {
        return item.unitId
      })
      const that = this
      this.$confirm({
        title: `确定进行${id ? '删除' : '批量删除'}操作?`,
        onOk () {
          that.$api.sys.unitDelete(ids).then(res => {
            if (res.code === 0) {
              this.$message.success('操作成功')
            }
          })
        },
        onCancel () {
          // console.log('Cancel');
        }
      })
    }
  }
}
</script>
<style lang="less">
// .unit-card {

// }
</style>
