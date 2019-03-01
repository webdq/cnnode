<template>
  <div>
    <Spin size="large" fix v-show="loading">
      <Icon type="load-a" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div v-if="!loading" class="article-wrap">
      <Breadcrumb :style="{'margin-bottom': '20px'}">
          <BreadcrumbItem>CNNODE</BreadcrumbItem>
          <BreadcrumbItem>{{curTab}}</BreadcrumbItem>
      </Breadcrumb>

      <h1 class="article-title">{{article.title}}</h1>

      <div class="article-author-row">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <div class="article-user">
              <Avatar shape="square" :src="article.author.avatar_url" />
              <span style="padding-left: 10px">{{article.author.loginname}}</span>
            </div>
          </Col>
          <Col span="4">
            <div class="article-date">
              <p>
                <Icon type="calendar"></Icon>
                {{article.create_at | dateFormat}}
              </p>
              <p>
                <Icon type="android-textsms"></Icon> {{article.reply_count}} / <Icon type="eye"></Icon> {{article.visit_count}}
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="article-content" v-html="article.content"></div>
      <ReplyList :replies="article.replies"></ReplyList>
      <ReplyPost v-if="$store.state.token" @reply-post="replyPost" :articleId="article.id"></ReplyPost>
    </div>
  </div>
</template>

<script>
  import menu from '@/router/menu'
  import ReplyPost from '@/views/reply_post.vue'
  import ReplyList from '@/views/reply_list.vue'
  import { getTopicById } from '@/api'
  export default {
    data(){
      return {
        article: {},
        tab: '',
        loading: true
      }
    },
    watch:{
      '$route': 'fetchData'
    },
    computed: {
      curTab(){
        let tab = menu.find(item => item.name === this.tab)
        return tab ? tab.meta.tabZh : ''
      }
    },
    methods: {
      fetchData(){
        getTopicById({id: this.$route.params.id}).then(({data}) => {
          this.article = data
          this.tab = data.tab
          this.loading = false
          this.$store.commit('CHANGE_TAB',{tab:data.tab})
        })
      },
      replyPost(){
        this.fetchData()
      }
    },
    components: {
      ReplyPost,
      ReplyList
    },
    created(){
      this.fetchData()
    }
  }
</script>

<style scoped>
.article-author-row{
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-top: 1px solid #dddee1;
  border-bottom: 1px solid #dddee1;
}
.article-title{
  text-align: center;
  margin-bottom: 20px;
}
.article-content{
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.article-content >>> p{
	white-space: pre-wrap;
	word-wrap: break-word;
  font-size: 15px;
  line-height: 1.7em;
  overflow: auto;
	margin: 1em 0;
}
.article-content >>> h1,
.article-content >>> h2,
.article-content >>> h3,
.article-content >>> h4,
.article-content >>> h5,
.article-content >>> h6{
  margin: 15px 0;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
.article-content >>> h1{
  font-size: 32px;
}
.article-content >>> h2{
  font-size: 26px;
}
.article-content >>> h3{
  font-size: 24px;
}
.article-content >>> h4{
  font-size: 17px;
}
.article-content >>> h5{
  font-size: 14px;
}
.article-content >>> h6{
  font-size: 12px;
}
.article-content >>> ul,
.article-content >>> ol {
  padding-left: 20px;
  margin-bottom: 20px;
}
.article-content >>> li{
  font-size: 14px;
  line-height: 2em;
}
.article-content >>> li code,
.article-content >>> p code{
  color: #000;
  background-color: #fcfafa;
  padding: 10px;
}
.article-content >>> img{
  max-width: 100%;
  height: auto;
}
.article-content >>> .prettyprint{
  padding: 10px;
  background: #495060;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 22px;
  -o-tab-size: 4;
  -moz-tab-size: 4;
  tab-size: 4;
}
.article-content >>> .prettyprint code{
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
}
.article-content >>> .prettyprint .kwd{
  color: #008;
}
.article-content >>> .prettyprint .pln{
  color: #000;
}
.article-content >>> .prettyprint .clo,
.article-content >>> .prettyprint .opn,
.article-content >>> .prettyprint .pun{
  color: #660;
}
.article-content >>> .prettyprint .str{
  color: #080;
}
.article-content >>> .prettyprint .com{
  color: #800;
}
</style>
