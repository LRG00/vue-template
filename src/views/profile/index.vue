<template>
  <div class="profile_container">
    <div class="content_title">编辑个人信息</div>
    <div class="profile_form">
      <Form ref="formProfile" :model="formProfile" :rules="ruleProfile" label-position='left' :label-width="63">
        <FormItem label="姓名：">
          <Row>
              <Col span="15">
                  <FormItem prop="age">
                      <Input type="password" placeholder="请输入" v-model="formProfile.passwd"/>
                  </FormItem>
              </Col>
              <Col span="2" style="text-align: center; margin-left:27px">性别：</Col>
              <Col span="5">
                  <FormItem prop="age">
                    <RadioGroup v-model="formProfile.gender">
                      <Radio label="male">男</Radio>
                      <Radio style="margin:0 0 0 17px" label="female">女</Radio>
                  </RadioGroup>
                  </FormItem>
              </Col>
          </Row>
        </FormItem>
        <FormItem label="部门：">
            <Row>
                <Col span="10">
                  <FormItem prop="age">
                    <Input type="password" placeholder="请输入" v-model="formProfile.passwd"/>
                  </FormItem>
                </Col>
                <Col span="2" style="text-align: center; margin-left:37px">职务：</Col>
                <Col span='10'>
                  <FormItem prop="age">
                    <Input type="password" placeholder="请输入" v-model="formProfile.passwdCheck"/>
                  </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="手机号码：" prop="age">
          <Input type="text" placeholder="请输入" v-model="formProfile.age" number />
        </FormItem>
        <FormItem label="邮箱：" prop="age">
          <Input type="text" placeholder="请输入" v-model="formProfile.age" number />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formProfile')">保存</Button>
          <Button @click="handleReset('formProfile')" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
      <div class="user_avatar">
        <div class="avatar"></div>
        <Button>密码修改</Button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'))
      } else {
        if (this.formProfile.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formProfile.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.formProfile.passwd) {
        callback(new Error('The two input passwords do not match!'))
      } else {
        callback()
      }
    }
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Age cannot be empty'))
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'))
        } else {
          if (value < 18) {
            callback(new Error('Must be over 18 years of age'))
          } else {
            callback()
          }
        }
      }, 1000)
    }

    return {
      formProfile: {
        passwd: '',
        passwdCheck: '',
        age: ''
      },
      ruleProfile: {
        gender: '',
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang='scss'>
@import '../../assets/scss/mixin';
.profile_container {
  .content_title {
    font-weight: 500;
    @include sc(18px, #000);
    border-bottom: 1px solid #E8E8E8;
    margin: 0 32px;
    padding: 20px 0 16px;
  }
  height: 100%;
  background: #fff;
  .profile_form {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    width: 65%;
    @include cl;
    .ivu-form{
      flex: 540;
      .ivu-form-item {
        &-label {
          padding-right: 0;
        }
        .ivu-row {
          .ivu-form-item {
            padding: 0;
          }
        }
      }
      .ivu-form-item:last-child {
        padding-top: 22px;
        .ivu-btn {
          @include wh(64px, 32px);
          line-height: 22px;
        }
        .ivu-btn:first-child {
          background: #5980F0;
        }
      }
    }
    .user_avatar {
      flex: 210;
      padding-left: 50px;
      .avatar {
        background-color: pink;
        @include wh(150px, 150px);
      }
      .ivu-btn {
        margin-top: 24px;
        border-radius:4px;
        @include wh(150px, 40px);
        background: #FAFAFA;
      }
    }
  }
}
</style>
