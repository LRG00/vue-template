<template>
  <div class="layout">
    <el-container>
      <el-header style="text-align: right;">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-container>
        <el-aside class="aside-wrap" width="220px">
          <el-menu text-color="#fff" active-text-color="red" background-color="#545c64">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>文章管理</template>
                <el-menu-item index="1-1" @click="$router.push({ name: '/post/list' })">文章列表</el-menu-item>
                <el-menu-item index="1-2" @click="$router.push({ name: '/post/create' })">添加文章</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>分类管理</template>
                <el-menu-item index="2-1" @click="$router.push({ name: '/cate/list' })">分类列表</el-menu-item>
                <el-menu-item index="2-2" @click="$router.push({ name: '/cate/create' })">添加分类</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>标签管理</template>
                <el-menu-item index="3-1" @click="$router.push({ name: '/tag/list' })">标签列表</el-menu-item>
                <el-menu-item index="3-2" @click="$router.push({ name: '/tag/create' })">添加标签</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
                <el-menu-item index="4-1" @click="$router.push({ name: '/users/list' })">用户列表</el-menu-item>
                <el-menu-item index="4-2" @click="$router.push({ name: '/users/create' })">添加用户</el-menu-item>
                <el-menu-item index="4-3" @click="$router.push({ name: '/users/pwd' })">修改密码</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting"></i>通用设置</template>
                <el-menu-item index="5-1" @click="$router.push({ name: '/setting/base' })">基础设置</el-menu-item>
                <el-menu-item index="5-2" @click="$router.push({ name: '/setting/navigation' })">菜单设置</el-menu-item>
            </el-submenu>
            <el-menu-item index="profile" @click="$router.push({ name: 'profile' })"><i class="el-icon-setting"></i>个人中心</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- <Layout>
      <Header>
        <div>
          <div class="layout-logo"></div>
          <ul>
            <li @click="$router.push('/profile')"><span><span class="user_name">用户名</span></span></li>
            <li><span><Icon type="ios-headset" /></span></li>
            <li><span><Icon type="ios-notifications" /></span></li>
          </ul>
        </div>
      </Header>
      <Layout>
        <Sider :style="{background: '#fff'}">
          <Menu active-name="1" width="auto" :open-names="['1']">
            <MenuItem name="1"><Icon type="ios-beer-outline" />快捷菜单</MenuItem>
            <MenuItem name="2"><Icon type="ios-beer-outline" />文档管理</MenuItem>
            <MenuItem name="3"><Icon type="ios-beer-outline" />项目管理</MenuItem>
            <MenuItem name="4"><Icon type="ios-beer-outline" />档案管理</MenuItem>
            <MenuItem name="5"><Icon type="ios-beer-outline" />系统管理</MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0'}">
          <Content :style="{position: 'relative', background: '#fff'}">
            <div class="content_main">
              <router-view />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout> -->
  </div>
</template>
<script>
export default {
  mounted () {
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/mixin';
.layout{
  height: 100vh;
  .el-container {
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
  }

  .el-main {
    background-color: #E9EEF3;
    padding: 10px 20px 20px 20px;
  }
  .aside-wrap .is-active {
    background: #BBFFFF !important;
  }
  .el-breadcrumb {
    padding-bottom: 10px;
  }
}
</style>
