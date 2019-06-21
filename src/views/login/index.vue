<template>
  <div class="login_container">
    <!-- <div class="co_img">
      <change-pw-modal></change-pw-modal>
      <Button @click="addrow">add</Button>
      <standard-table
        @onChangePagination='onChangePagination'
        :columns='columns'
        :data='data'
        :data1='data1'
        :pagination='pagination'
      />
    </div> -->
    <div class="login_form" v-if="!forget">
      <Form ref="login_form" :model="formData" :rules="rules">
        <FormItem>
          <span class="title">欢迎登录</span>
        </FormItem>
        <FormItem prop="mail">
          <Input prefix="ios-contact" type="text" v-model="formData.user_name" placeholder="邮箱" />
        </FormItem>
        <FormItem prop="password">
          <Input prefix="ios-lock-outline"  type="password" v-model="formData.user_password" placeholder="密码" />
        </FormItem>
        <FormItem>
            <span class="forget" @click="handleForget(true)">忘记密码</span>
        </FormItem>
        <FormItem>
            <Button style="width:100%;" type="primary" @click="handleSubmit('login_form')">登录</Button>
        </FormItem>
      </Form>
    </div>
    <div class="login_form" v-else>
      <Form ref="login_form" :model="formData" :rules="rules">
        <FormItem>
          <span class="title">忘记密码</span>
        </FormItem>
        <FormItem prop="mail">
          <Input prefix="ios-contact" type="text" v-model="formData.mail" placeholder="邮箱" />
        </FormItem>
        <FormItem>
            <Button style="width:100%;" type="primary" @click="handleSubmit('login_form')">密码发送至邮箱</Button>
        </FormItem>
        <FormItem>
            <Button style="width:100%;" @click="handleForget(false)">返回登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import ChangePwModal from '@/components/ChangePwModal'
import StandardTable from '@/components/StandardTable'
import { signIn } from '@/api/login'
export default {
  components: {
    ChangePwModal,
    StandardTable
  },
  data () {
    return {
      forget: false,
      formData: {
        user_name: '张一',
        user_password: 'zhangyi'
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        user_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不少于6位', trigger: 'blur' }
        ]
      },
      pagination: {
        page: 1,
        total: 100,
        size: 10
      },
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data: [
      ],
      data1: {}
    }
  },
  mounted () {
    // signIn({gender: 'M', name: 'xiaoming'}).then(res=>{
    //   console.log(res, 'sad')
    // })
  },
  methods: {
    addrow () {
      this.data.push({
        name: 'John Brown',
        age: 18888,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      })
    },
    onChangePagination ({ page, size }) {
      console.log(page, size, 'kkk')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          signIn(this.formData).then(res => {
            if (res.code === '000001') {
              localStorage.setItem('token', res.data)
              localStorage.setItem('token_exp', new Date().getTime())
              this.$router.push('/')
            } else {
              alert(res.msg)
            }
          })
        } else {
          this.$Message.error('请填写完整!')
        }
      })
    },
    handleForget (val) {
      console.log('ddd')
      this.forget = val
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/mixin';
.login_container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  .co_img {
    flex: 800;
    // border: 1px solid red;
  }
  .login_form {
    flex: 566;
    position: relative;
    .ivu-form {
      width: 65%;
      @include center;
      .title {
        font-weight:400;
        @include sc(26px, #000);
      }
      .forget {
        cursor: pointer;
      }
    }
  }
}
</style>
