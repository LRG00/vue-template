<template>
  <el-card>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="已发布" name="second"></el-tab-pane>
      <el-tab-pane label="审核中" name="third"></el-tab-pane>
      <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
    </el-tabs> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="sort_id" label="分类id"></el-table-column>
      <el-table-column prop="sort_name" label="分类名称"></el-table-column>
      <el-table-column prop="sort_alias" label="分类别名"></el-table-column>
      <el-table-column prop="sort_description" label="分类描述"></el-table-column>
      <el-table-column prop="parent_sort_id" label="父分类id"></el-table-column>
      <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { getList } from '@/api/cate'
export default {
  data() {
    return {
      tableData: [],
      activeName: "second"
    };
  },
  mounted() {
    this.getPostList()
  },
  methods: {
    getPostList () {
      getList().then(res => {
        this.tableData = res.data
        console.log(res.data)
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>