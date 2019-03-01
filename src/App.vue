<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header>
          <div class="layout-logo">
            <img src="@/assets/logo.png" alt="">
          </div>
          <div class="layout-nav">
            <Dropdown v-if="token" trigger="click" placement="bottom-end">
              <a style="color: #fff;font-size: 14px;" href="javascript:void(0)">
                <Avatar style="margin-right:5px;" :src="user.avatar_url" shape="square" icon="ios-person" /> {{user.loginname}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem class="user-nav-li">
                  <router-link tag="a" to="/messages">我的消息</router-link>
                </DropdownItem>
                <DropdownItem class="user-nav-li">
                  <router-link tag="a" :to="{name: 'user', params: {username: `${user.loginname}`}}">个人信息</router-link>
                </DropdownItem>
                <DropdownItem class="user-nav-li">
                  <router-link tag="a" to="/post">新建主题</router-link>
                </DropdownItem>
                <DropdownItem class="user-nav-li">
                  <router-link tag="a" to="/collect">收藏的主题</router-link>
                </DropdownItem>
                <DropdownItem class="user-nav-li">
                  <a @click="logout">退出</a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <router-link v-else class="to-login" tag="div" to="/login">
              <Icon type="ios-contact" size="18" />
              登录
            </router-link>
          </div>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu class="side-menu" active-name="全部" theme="light" width="auto" :open-names="['1']">
              <router-link
                v-for="(item,index) in menu"
                :key="index"
                tag="li"
                :to="item.path"
                class="ivu-menu-item"
                :class="{active: tab === item.name}"
              >
                {{item.meta.tabZh}}
              </router-link>
            </Menu>
          </Sider>
          <Layout :style="{padding: '25px','min-height': '600px'}">
            <Content class="page-content">
              <router-view></router-view>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
import menu from '@/router/menu'
export default {
  name: "App",
  data(){
    return {
      menu
    }
  },
  computed:{
    tab(){
      return this.$store.state.tab
    },
    token(){
      return this.$store.state.token
    },
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    logout(){
      this.$store.commit('SIGNOUT')
      this.$router.push({path: '/'})
    }
  }
};
</script>

<style>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.ivu-layout-header{
  padding: 10px 25px;
  justify-content: space-between;
  display: flex;
  line-height: 44px;
}
.layout-logo {
  width: 155px;
  border-radius: 3px;
}
.user-nav-li{
  padding: 0;
}
.user-nav-li a{
  display: block;
  padding: 7px 16px;
  color: #495060;
}
.user-nav-li a:hover{
  color: #80bd01;
}
.ivu-menu{
  height: 100%;
  padding: 25px 0;
}
.side-menu .ivu-menu-item.router-link-exact-active,
.side-menu .ivu-menu-item.active{
  color: #80bd01;
  border-right: 3px solid #80bd01;
}
.side-menu.ivu-menu-light.ivu-menu-vertical .ivu-menu-item.router-link-exact-active,
.side-menu.ivu-menu-light.ivu-menu-vertical .ivu-menu-item.active{
  color: #80bd01;
  border-right: 3px solid #80bd01;
}
.to-login{
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
.page-content{
  padding: 24px;
  min-height: 280px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #dddee1;
  position: relative;
}
.ivu-page-item:hover {
  border-color: #80bd01;
}
.ivu-page-item:hover a{
  color: #80bd01;
}
.ivu-page-item-active{
  background-color: #80bd01;
  border-color: #80bd01;
}
.ivu-page-item-active a,
.ivu-page-item-active:hover a{
  color: #fff;
}
.ivu-page-next:hover,
.ivu-page-prev:hover{
  border-color: #80bd01;
}
.ivu-page-next:hover a,
.ivu-page-prev:hover a {
  color: #80bd01;
}
.ivu-page-item-jump-next:hover a,
.ivu-page-item-jump-prev:hover a{
  color: #80bd01;
}
.ivu-spin{
  color: #80bd01;
}
.spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
