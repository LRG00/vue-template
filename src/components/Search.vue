<template>
  <div class="search_container">
    <Form ref="search_form" :inline='true' :model="formData">
      <FormItem>
        <Input type="text" v-model="formData.value" placeholder="请输入" />
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit('search_form')">搜素</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        value: ''
      }
    }
  }
}
</script>
<style lang='scss'>
.search_container {
	position: absolute;
	top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94%;
  .ivu-form {
    height: 40px;
    display: flex;
    .ivu-form-item:first-child {
      flex: 1000;
      .ivu-input {
        height: 40px;
      }
    }
    .ivu-form-item:last-child {
      flex: 50;
      .ivu-btn {
        height: 40px;
        width: 74px;
      }
    }
  }
}
</style>
