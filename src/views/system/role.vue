<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="">
              <a-input v-model="queryParam.roleName" placeholder="角色名称"/>
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
      rowKey="roleId"
      :columns="columns"
      :data="loadData"
      :rowSelection="options.rowSelection"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="$refs.createModal.add(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteHandle(record.roleId)">删除</a>
      </span>
    </s-table>

    <role-modal :menuIdList='menuIdList' :unitList='unitList' ref="createModal" @ok="handleOk"></role-modal>

  </a-card>
</template>

<script>
import { STable } from '@/components'
import RoleModal from './role-add-or-update'
import { treeDataTranslate1 } from '@/utils'
export default {
  name: 'Role',
  components: {
    STable,
    RoleModal
  },
  data () {
    return {
      unitList: [],
      menuIdList: [],
      treeDataTranslate1,
      // 查询参数
      queryParam: { roleName: '', unitId: undefined },
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'roleId'
        },
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
        {
          title: '所属公司',
          dataIndex: 'unitName'
        },
        {
          title: '备注',
          dataIndex: 'remark'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const { pageNo, pageSize } = parameter
        return this.$api.sys.getRoleList(Object.assign({ page: pageNo, limit: pageSize }, this.queryParam))
          .then(res => {
            const { currPage, pageSize, totalCount, totalPage, list } = res.page
            return { data: list, pageNo: currPage, pageSize, totalCount, totalPage }
          })
      },
      options: {
        rowSelection: {
          onChange: this.onSelectChange
        }
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  
  created () {
    this.$api.sys.getMenuList(Object.assign({}, {}))
    .then(res => {
      this.menuIdList = treeDataTranslate1(res, 'menuId')
    })
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
      // 新增/修改 成功时，重载列表
      this.$refs.table.refresh()
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 删除
    deleteHandle (id) {
      const ids = id ? [id] : this.selectedRows.map(item => {
        return item.roleId
      })
      const that = this
      this.$confirm({
        title: `确定进行${id ? '删除' : '批量删除'}操作?`,
        onOk () {
          that.$api.sys.roleDelete(ids).then(res => {
            if (res.code === 0) {
              that.handleOk()
              that.$message.success('操作成功')
            }
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
