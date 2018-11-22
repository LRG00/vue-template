<template>
  <div class="document_container">
    <div class="search">
      <search />
    </div>
    <div class="project">
      <Tabs :animated='false' value="name2">
          <TabPane label="我的项目" name="name2">标签二的内容</TabPane>
          <TabPane label="我的档案" name="name3">标签三的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import Search from '../../components/Search'
export default {
  components: {
    Search
  },
  data () {
    return {

    }
  }
}
</script>
<style lang='scss'>
@import '../../assets/scss/mixin';
.document_container {
  .search {
    height: 104px;
    padding: 0 32px;
    background: #fff;
    position: relative;
  }
  .project {
    margin-top: 20px;
    .ivu-tabs-bar {
      margin-bottom: 0;
      .ivu-tabs-nav-container {
        .ivu-tabs-nav-scroll {
          height: 54px;
          background: #fff;
          .ivu-tabs-nav {
            position: absolute;
            left: 0%;
            transform: translateX(0%);
            width: 30%;
            .ivu-tabs-ink-bar {
              height: 2px;
              width: 20px;
            }
          }
          .ivu-tabs-tab {
            line-height: 38px;
            width: 33%;
          }
        }
      }
    }
  }
}
</style>
