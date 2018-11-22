<template>
  <div class="dashboard_container">
    <Tabs value="name1">
        <TabPane label="我的文档" name="name1">
          <document />
        </TabPane>
        <TabPane label="我的项目" name="name2">标签二的内容</TabPane>
        <TabPane label="我的档案" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>
<script>
import Document from './document'
export default {
  components: {
    Document
  },
  data () {
    return {

    }
  }
}
</script>
<style lang='scss'>
.dashboard_container {
  .ivu-tabs-bar {
    margin-bottom: 0;
    .ivu-tabs-nav-container {
      border-bottom: 1px solid #d9d9d9;
      .ivu-tabs-nav-scroll {
        height: 56px;
        background: #fff;
        .ivu-tabs-nav {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 30%;
          .ivu-tabs-ink-bar {
            height: 0;
          }
        }
        .ivu-tabs-tab {
          line-height: 38px;
          width: 33%;
          &-active {
            font-weight: 500;
            color: #5980F0;
          }
        }
      }
    }
  }
}
</style>
