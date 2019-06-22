<template>
  <el-card>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="已发布" name="second"></el-tab-pane>
      <el-tab-pane label="审核中" name="third"></el-tab-pane>
      <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
    </el-tabs> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="label_id" label="标签id"></el-table-column>
      <el-table-column prop="label_name" label="标签名称"></el-table-column>
      <el-table-column prop="label_alias" label="标签别名"></el-table-column>
      <el-table-column prop="label_description" label="标签描述"></el-table-column>
      <!-- <el-table-column prop="parent_sort_id" label="父标签id"></el-table-column> -->
      <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { getList } from '@/api/tag'
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