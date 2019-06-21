<template>
  <el-card>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="已发布" name="second"></el-tab-pane>
      <el-tab-pane label="审核中" name="third"></el-tab-pane>
      <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
    </el-tabs> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="article_title" label="标题"></el-table-column>
      <el-table-column prop="user_id" label="作者"></el-table-column>
      <el-table-column prop="article_id" label="状态"></el-table-column>
      <el-table-column prop="article_date" label="创建时间"></el-table-column>
      <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { getList } from '@/api/post'
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
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>