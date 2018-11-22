<template>
  <div class="standard_table">
    <Table :columns="columns" :data="data"></Table>
    <div class="page_style" v-if="pagination.total">
      <Page
        show-sizer
        :total="pagination.total"
        @on-change="changePage"
        @on-page-size-change="changeSize"
      />
    </div>
    {{this.xxx}}
  </div>
</template>
<script>
export default {
  props: {
    columns: {},
    data: {},
    data1: {},
    pagination: {}
  },
  mounted () {
    console.log(this.data1,'ooo')
  },
  updated () {
    // console.log('ziziizi', this.data, this.pagination)
    this.xxx = this.data1.yi - this.data1.er
  },
  data () {
    return {
      xxx: 0
      // pagination: {
      //   size: 10,
      //   page: 1
      // }
    }
  },
  methods: {
    changePage (page) {
      this.pagination.page = page
      this.$emit('onChangePagination', this.pagination)
    },
    changeSize (size) {
      this.pagination.size = size
      this.$emit('onChangePagination', this.pagination)
    }
  }
}
</script>

<style lang='scss'>
.standard_table {
  div.ivu-table-wrapper {
    border: none;
  }
  .ivu-table:before{content:'';width:100%;height:0px;position:absolute;left:0;bottom:0;z-index:1}
  .ivu-table:after{content:'';width:0px;height:100%;position:absolute;top:0;right:0;z-index:3}
  .page_style {
    float: right;
    margin-top: 24px;
  }
}
</style>
