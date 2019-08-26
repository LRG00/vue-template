<template>
  <a-card :bordered="false">
    <div class="menu-add">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="menuId"
      :columns="columns"
      :showPagination="false"
      :data="loadData"
    >
      <span slot="type" slot-scope="text">
        <template>
          <a-tag :color="text === 0 ? '#2db7f5' : text === 1 ? '#87d068' : '#f50'">{{ typeList[text].name }}</a-tag>
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.createModal.add(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
        <template>
          <a @click="deleteHandle(record.menuId)">删除</a>
        </template>
      </span>
    </s-table>
    <menu-modal :menuList="menuList" ref="createModal" @ok="handleOk"></menu-modal>
  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable } from '@/components'
import { treeDataTranslate } from '@/utils'
import MenuModal from './menu-add-or-update'
export default {
  name: 'TableList',
  components: {
    STable,
    MenuModal
  },
  data () {
    return {
      menuList: [],
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
      treeDataTranslate,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: 'ID',
          dataIndex: 'menuId'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '上级菜单',
          dataIndex: 'parentName'
        },
        // {
        //   title: '图标',
        //   dataIndex: 'xxx',
        // },
        {
          title: '类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '排序号',
          dataIndex: 'orderNum'
        },
        {
          title: '菜单URL',
          dataIndex: 'url'
        },
        {
          title: '授权标识',
          dataIndex: 'perms'
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
        return this.$api.sys.getMenuList(Object.assign(parameter, this.queryParam))
          .then(res => {
            this.menuList = treeDataTranslate(res, 'menuId')
            return { data: this.menuList }
          })
      }
    }
  },
  methods: {
    // 删除
    deleteHandle (id) {
      const that = this
      this.$confirm({
        title: `确定进行删除操作?`,
        onOk () {
          that.$api.sys.menuDelete(id).then(res => {
            if (res.code === 0) {
              that.handleOk()
              that.$message.success('操作成功')
            }
          })
        },
        onCancel () {}
      })
    },
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.$refs.table.refresh()
    }
  }
}
</script>
<style lang="less">
  .menu-add {
    margin-bottom: 18px;

    button {
      margin-right: 8px;
    }
  }
</style>
