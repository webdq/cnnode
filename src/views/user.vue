<template>
  <div>
    <Spin size="large" fix v-show="loading">
      <Icon type="load-a" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>

    <div v-if="this.error_msg">
      <h2>{{this.error_msg}}}</h2>
    </div>

    <div v-if="!this.error_msg">
      <div style="margin-bottom: 20px">
        <h2 class="panel-title">
          <Icon type="ios-contact" size="18"></Icon>
          用户信息
        </h2>
        <Card>
          <ul class="userinfo-list">
            <li><Avatar shape="square" icon="ios-person" size="large" :src="user.avatar_url" /></li>
            <li>用户名：{{user.loginname}}</li>
            <li>github：{{user.githubUsername}}</li>
            <li>创建时间：{{user.create_at | dateFormat}}</li>
            <li>积分：{{user.score}}</li>
          </ul>
        </Card>
      </div>

      <div style="margin-bottom: 20px">
        <h2 class="panel-title">
          <Icon type="ios-paper" size="18"></Icon>
          最近创建的话题
        </h2>
        <div class="article-list">
          <div
            v-for="item in user.recent_topics"
            :key="item.id"
            class="article-item"
          >
            <Card>
              <Row :gutter="16">
                <Col span="2">
                  <div>
                    <router-link tag="a" :to="{name: 'user', params: {username: `${item.author.loginname}`}}">
                      <Avatar shape="square" icon="ios-person" size="large" :src="item.author.avatar_url" />
                    </router-link>
                  </div>
                </Col>
                <Col span="22">
                  <p class="article-item-title">
                    <router-link tag="a" :to="{name: 'article_detail', params: {id: `${item.id}`}}">{{item.title}}</router-link>
                  </p>
                  <div style="font-size: 12px;">
                    <span style="padding-right: 10px;">
                      <Icon type="android-person"></Icon>
                      {{item.author.loginname}}
                    </span>
                    <span>
                      <Icon type="chatbox" />
                      {{item.last_reply_at | dateFormat}}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <h2 class="panel-title">
          <Icon type="ios-list" size="18"></Icon>
          最近参与的话题
        </h2>
        <div class="article-list">
          <div
            v-for="item in user.recent_replies"
            :key="item.id"
            class="article-item"
          >
            <Card>
              <Row :gutter="16">
                <Col span="2">
                  <div>
                    <router-link tag="a" :to="{name: 'user', params: {username: `${item.author.loginname}`}}">
                      <Avatar shape="square" icon="ios-person" size="large" :src="item.author.avatar_url" />
                    </router-link>
                  </div>
                </Col>
                <Col span="22">
                  <p class="article-item-title">
                    <router-link tag="a" :to="{name: 'article_detail', params: {id: `${item.id}`}}">{{item.title}}</router-link>
                  </p>
                  <div style="font-size: 12px;">
                    <span style="padding-right: 10px;">
                      <Icon type="android-person"></Icon>
                      {{item.author.loginname}}
                    </span>
                    <span>
                      <Icon type="chatbox" />
                      {{item.last_reply_at | dateFormat}}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { getUser } from '@/api'
  export default {
    name: "User",
    data(){
      return {
        user: {},
        error_msg: '',
        loading: true
      }
    },
    methods: {
      showUser(){
        let username = this.$route.params.username
        getUser({username}).then(res => {
          if(res.success){
            this.user = res.data
            this.error_msg = ''
          }else{
            this.user = {}
            this.error_msg = res.error_msg
          }
          this.loading = false
        })
      }
    },
    created(){
      this.showUser()
    },
    updated(){
      this.showUser()
    }
  }
</script>

<style scoped>
.userinfo-list{
  padding-left: 20px;
}
.userinfo-list li{
  margin-bottom: 5px;
}
.panel-title{
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}
.article-item{
  padding: 5px 0;
}
.article-item-title a{
  color: #495060;
}
.article-item-title a:hover{
  text-decoration: underline;
}
</style>
