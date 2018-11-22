<template>
    <div class="change_pwd_modal">
      <Button type="primary" @click="modalVisible = true">修改密码</Button>
      <Modal
        width='554'
        class-name='change_pwd'
        :footer-hide='true'
        v-model="modalVisible"
        title="修改密码">
          <Form ref="change_pwd_form" :model="formData" :rules="rules">
            <FormItem prop="mail">
              <Input prefix="ios-lock-outline" type="text" v-model="formData.mail" placeholder="旧密码" />
            </FormItem>
            <FormItem prop="password">
              <Input prefix="ios-lock-outline"  type="password" v-model="formData.password" placeholder="新密码" />
            </FormItem>
            <FormItem>
                <Button style="width:100%;" type="primary" @click="handleSubmit('change_pwd_form')">确定</Button>
            </FormItem>
          </Form>
      </Modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        mail: '',
        password: ''
      },
      rules: {
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不少于6位', trigger: 'blur' }
        ]
      },
      modalVisible: false
    }
  },
    mounted () {
    setTimeout('console.log("chanchancahn")',2000);
  },
  methods: {
    handleSubmit () {
      this.modalVisible = false
    }
  }
}
</script>

<style lang='scss'>
// .change_pw_modal {

// }
.change_pwd {
  .ivu-modal {
    &-header {
      border-bottom: none;
      text-align: center;
      padding: 40px 16px;
      &-inner {
        font-size: 26px;
        overflow: initial;
        line-height: 26px;
      }
    }
    &-body {
      padding: 0 93px 60px;
    }
    &-footer {
      border-top: none;
      text-align: center;
    }
    &-close {
      display: none;
    }

  }
}
</style>
