<template>
  <a-card class="unit-card" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item label="">
              <a-input v-model="queryParam.key" placeholder="公司名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
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
      rowKey="unitId"
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
import CreateForm from './schedule-add-or-update'
export default {
  name: 'Unit',
  components: {
    STable,
    CreateForm
  },
  data () {
    return {
      // 查询参数
      queryParam: { key: '' },
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'unitId'
        },
        {
          title: '公司名称',
          dataIndex: 'name'
        },
        {
          title: '公司编码',
          dataIndex: 'code'
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate'
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
        return this.$api.sys.getUnitList(Object.assign({ page: pageNo, limit: pageSize }, this.queryParam))
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
