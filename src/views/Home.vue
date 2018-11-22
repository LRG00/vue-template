<template>
  <div class="layout">
    <Layout>
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
    </Layout>
  </div>
</template>
<script>
export default {

}
</script>

<style lang='scss'>
@import '../assets/scss/mixin';
.layout{
  height: 100vh;
  .ivu-layout {
    height: 100%;
  }
  .ivu-menu {
    height: 100%;
    background: #F6F7F8;
    &-item-active {
      background: rgba(0,0,0,0.05) !important;
      color: #000 !important;
      font-weight: 500 !important;
      &::after {
        width: 0 !important;
      }
      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 30px;
        position: absolute;
        margin-top: 10px;
        top: 0;
        bottom: 0;
        left: 0;
        background: $blue;
      }
    }
  }
  .ivu-layout-header {
    background-color: $blue;
    height: 64px;
    padding: 0;
    ul {
      float: right;
      height: 64px;
      color: #fff;
      li {
        float: left;
        margin-right: 22px;
        font-size: 13px;
        .user_name {
          font-size: 13px;
        }
      }
    }
    .layout-logo{
      @include wh(100px, 30px);
      background: $gc;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
    }
  }
  .content_main {
    // background: #FBFBFB;
    height: 600px; //dddddd
  }
}
</style>
