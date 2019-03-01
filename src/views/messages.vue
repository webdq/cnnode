<template>
  <div>
    <Spin size="large" fix v-show="loading">
      <Icon type="load-a" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <h2 class="msg-title">
      <Icon type="ios-chatbubble" size="18"></Icon>
      我的消息
      <span class="not-read-count">未读消息数：{{hasNotRead.length}}</span>
    </h2>
    <div style="margin-bottom: 10px; text-align: right;">
      <Button @click="markAllHandle" class="mark-all-btn">标记全部已读</Button>
    </div>

    <div class="ivu-table-wrapper">
      <div class="ivu-table ivu-table-border" style="width: 100%; overflow: auto;">

        <table cellspacing="0" cellpadding="0" border="0" style="width:100%;">
          <thead>
            <tr>
              <th width="50">状态</th>
              <th width="200">文章标题</th>
              <th width="100">作者</th>
              <th width="200">回复内容</th>
              <th width="120">回复时间</th>
              <th width="80">操作</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item,index) in msgAll" :key="item.id">
              <td>{{item.has_read ? '已读' : '未读'}}</td>
              <td class="article-item-title">
                <router-link tag="a" :to="{name: 'article_detail', params: {id: `${item.topic.id}`}}">{{item.topic.title}}</router-link>
              </td>
              <td>{{item.author.loginname}}</td>
              <td>{{item.reply.content}}</td>
              <td>{{item.reply.create_at | dateFormat}}</td>
              <td>
                <Button v-if="!item.has_read" @click="markOneHandle(item.id, index)" class="mark-btn" size="small" type="default">标记已读</Button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  </div>
</template>

<script>
  import { getMsgAll, markMsgOne, markMsgAll } from '@/api'
  export default {
    data(){
      return {
        hasRead: [],
        hasNotRead: [],
        loading: true
      }
    },
    computed: {
      msgAll(){
        return [...this.hasNotRead, ...this.hasRead]
      }
    },
    methods: {
      getMessage(){
        getMsgAll().then(res => {
          this.hasRead = res.data.has_read_messages
          this.hasNotRead = res.data.hasnot_read_messages
          this.loading = false
        })
      },
      markOneHandle(id,index){
        markMsgOne({id}).then(res => {
          if(res.success){
            this.$Message.success('标记成功')
            let msg = this.hasNotRead.splice(index,1)[0]
            msg.has_read = true
            this.hasRead.unshift(msg)
          }else{
            this.$Message.error('标记失败')
          }
        })
      },
      markAllHandle(){
        markMsgAll().then(res => {
          if(res.success){
            this.$Message.success('标记成功')
            this.hasNotRead.map(item => item.has_read = true)
            this.hasRead = [...this.hasNotRead,...this.hasRead]
            this.hasNotRead = [];
          }else{
            this.$Message.error('标记失败')
          }
        })
      }
    },
    mounted() {
      this.getMessage()
    }
  }
</script>

<style scoped>
.msg-title{
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  margin-bottom: 10px;
}
.not-read-count{
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  border-radius: 10px;
  min-width: 20px;
  background: #f90;
  color: #fff;
  line-height: 20px;
  text-align: center;
  padding: 0 6px;
  font-size: 12px;
  white-space: nowrap;
}
.mark-all-btn{
  color: #fff;
  background-color: #80bd01;
  border-color: #80bd01;
}
.article-item-title a{
  color: #495060;
}
.article-item-title a:hover{
  text-decoration: underline;
}
.mark-btn:hover,
.mark-btn:focus{
  color: #80bd01;
  border-color: #80bd01;
}
.ivu-table td, .ivu-table th{
  height: auto;
  padding: 8px;
  word-break: break-all;
  word-wrap:break-word;
}
</style>
