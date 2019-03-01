<template>
  <div>
    <Form ref="formLogin" :model="formLogin" :rules="formRules" label-position="top">
      <FormItem label="Access-Token:" prop="token">
        <Input v-model="formLogin.token" placeholder="请输入token">
          <Icon :style="{width: '40px'}" type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <div>
        <Button class="login-btn" type="primary" @click="handleSubmit('formLogin')" long>登录</Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import { checkToken } from '@/api'
  export default {
    name: "Login",
    data(){
      return {
        formLogin: {
          token: '',
        },
        formRules: {
          token: [
            { required: true, message: '请输入token', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            checkToken({
              token: this.formLogin.token
            }).then(res => {
              this.$store.commit('SIGNIN',{token: this.formLogin.token, user: res})
              let path = this.$route.query.redirect || '/'
              this.$router.push({path})
            }).catch(err => {
              this.$Message.error('登录失败')
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
.login-btn{
  background-color: #80bd01;
  border-color: #80bd01;
}
</style>
