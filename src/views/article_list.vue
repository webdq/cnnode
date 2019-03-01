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
      <div class="article-list">
        <div
          v-for="item in list"
          :key="item.id"
          class="article-item"
        >
          <Row :gutter="16">
            <Col span="2">
              <div>
                <router-link tag="a" :to="{name: 'user', params: {username: `${item.author.loginname}`}}">
                  <Avatar shape="square" icon="ios-person" size="large" :src="item.author.avatar_url" />
                </router-link>
              </div>
            </Col>
            <Col span="17">
              <h3 class="article-item-title">
                <Tag :color="tagColor(item)">{{tag(item)}}</Tag>
                <router-link tag="a" :to="{name: 'article_detail', params: {id: `${item.id}`}}">{{item.title}}</router-link>
              </h3>
              <div>
                <Icon type="android-person"></Icon>
                {{item.author.loginname}}
              </div>
            </Col>
            <Col span="5">
              <div>
                <Icon type="calendar"></Icon>
                {{item.create_at | dateFormat}}
              </div>
              <div>
                <Icon type="android-textsms"></Icon> {{item.reply_count}} / <Icon type="eye"></Icon> {{item.visit_count}}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Page @on-change="changePage" :current="curPage" :total="$route.meta.total" :page-size="40"></Page>
    </div>
  </div>
</template>

<script>
  import { getTopics } from '@/api'
  import moment from 'moment'
  export default {
    data(){
      return {
        list: [],
        html: '',
        tab: '',
        limit: 40,
        loading: true
      }
    },
    computed: {
      curPage(){
        let qpage = parseInt(this.$route.query.page);
        let mpage = parseInt(this.$route.meta.page);
        return qpage ? (qpage > mpage ? mpage : qpage) : 1
      },
      curTab(){
        return this.$route.meta.tabZh
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      tag(item){
        if(item.top) return '置顶'
        if(item.good) return '精华'
        let type = {
          share: '分享',
          ask: '问答',
          job: '招聘',
          dev: '测试'
        }
        return type[item.tab]
      },
      tagColor(item){
        return (item.top || item.good) ? '#80bd01' : 'default'
      },
      fetchData(){
        this.$store.commit('CHANGE_TAB',{tab:this.$route.name})
        getTopics({
          page: this.curPage,
          tab: this.$route.meta.tab,
          limit: 40
        }).then(res => {
          this.list = res.data;
          this.loading = false;
        })
      },
      changePage(page){
        this.$router.push({path:this.$route.meta.tab, query:{page: page}})
      }
    },
    created(){
      this.fetchData()
    }
  }
</script>

<style scoped>
.article-list{
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}
.article-item{
  padding: 20px 0;
}
.article-item + .article-item{
  border-top: 1px solid #ddd;
}
.article-item-title a{
  color: #495060;
}
.article-item-title a:hover{
  text-decoration: underline;
}
</style>
