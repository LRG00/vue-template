<template>
  <el-card>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="已发布" name="second"></el-tab-pane>
      <el-tab-pane label="审核中" name="third"></el-tab-pane>
      <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
    </el-tabs> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="user_id" label="用户id"></el-table-column>
      <el-table-column prop="user_ip" label="用户ip"></el-table-column>
      <el-table-column prop="user_name" label="用户名"></el-table-column>
      <el-table-column prop="user_password" label="用户密码"></el-table-column>
      <el-table-column prop="user_email" label="用户邮箱"></el-table-column>
      <el-table-column prop="user_profile_photo" label="用户头像"></el-table-column>
      <el-table-column prop="user_level" label="用户等级"></el-table-column>
      <el-table-column prop="user_rights" label="用户权限"></el-table-column>
      <el-table-column prop="user_registration_time" label="注册时间"></el-table-column>
      <el-table-column prop="user_birthday" label="用户生日"></el-table-column>
      <el-table-column prop="user_age" label="用户年龄"></el-table-column>
      <el-table-column prop="user_telephone_number" label="用户手机号"></el-table-column>
      <el-table-column prop="user_nickname" label="用户昵称"></el-table-column>
      <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { getList } from '@/api/user'
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