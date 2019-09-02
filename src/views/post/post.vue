<template>
  <a-card class="unit-card" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item label="">
              <a-input v-model="queryParam.article_title" placeholder="标题"/>
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
      rowKey="article_id"
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
import CreateForm from './post-add-or-update'
export default {
  name: 'Unit',
  components: {
    STable,
    CreateForm
  },
  data () {
    return {
      // 查询参数
      queryParam: { article_title: '' },
      // 表头
      columns: [
        {
          title: '标题',
          dataIndex: 'article_title'
        },
        {
          title: '作者',
          dataIndex: 'user_name'
        },
        {
          title: '状态',
          dataIndex: 'article_id'
        },
        {
          title: '创建时间',
          dataIndex: 'article_date'
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
        return this.$api.sys.getPostList(Object.assign({ pageNo, pageSize }, this.queryParam))
          .then(res => {
            console.log(res, 'asd')
            const { data, pageNo, pageSize, totalCount, totalPage } = res
            return { data, pageNo, pageSize, totalCount, totalPage }
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
              that.handleOk()
              that.$message.success('操作成功')
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
