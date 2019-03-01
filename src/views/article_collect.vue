<template>
  <div>
    <h2 class="collect-title">
      <Icon type="ios-star" size="18"></Icon>
      收藏的主题
    </h2>
    <div class="article-list">
      <div
        v-for="item in list"
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
</template>

<script>
  import { getCollectTopics } from '@/api'
  export default {
    data(){
      return {
        list: []
      }
    },
    methods: {
      getCollect(){
        let loginname = this.$store.state.user.loginname
        getCollectTopics({loginname}).then(res => {
          this.list = res.data
        })
      }
    },
    mounted() {
      this.getCollect()
    }
  }
</script>

<style scoped>
.collect-title{
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
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
