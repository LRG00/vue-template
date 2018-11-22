<template>
    <div class="change_pwd_modal">
      <Button type="primary" @click="modalVisible = true">修改密码</Button>
      <Modal
        width='428'
        class-name='result_modal'
        :footer-hide='true'
        v-model="modalVisible">
        <div class="result_content">
          <span><Icon type="md-checkmark-circle" /></span>
          <div>测试成功</div>
        </div>
      </Modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      modalVisible: false
    }
  },
  methods: {
  }
}
</script>

<style lang='scss'>
.result_modal {
  .ivu-modal {
    &-body {
      .result_content {
        span {
          font-size: 96px;
          color: #52C41A;
        }
        div {
          font-size: 20px;
        }
        text-align: center;
        padding: 0px 145px 45px;
      }
    }
    &-close {
      display: none;
    }
  }
}
</style>
