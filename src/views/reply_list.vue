<template>
  <div class="replies">
    <h3 class="replies-header">
      总共 {{replies.length}} 条回复
    </h3>
    <div class="replies-list">
      <div
        v-for="item in replies"
        :key="item.id"
        class="replies-item"
      >
        <div class="replies-top">
          <Row type="flex" justify="space-between">
            <div class="replies-user">
              <Avatar shape="square" :src="item.author.avatar_url" />
              <span style="padding-left: 10px">{{item.author.loginname}}</span>
            </div>
            <div class="replies-date">
              <Icon type="calendar"></Icon>
              {{item.create_at | dateFormat}}
            </div>
          </Row>
        </div>
        <div v-html="item.content" class="replies-content"></div>
        <div class="replies-btns">
          <!--<Button class="edit-btn" size="small"><Icon type="edit"></Icon> 编辑</Button>-->
          <!--<Button class="remove-btn" size="small"><Icon type="ios-trash"></Icon> 删除</Button>-->
          <Button v-if="$store.state.token" @click="likeUp(item)" :class="{'zan-btn': true, 'active': item.is_uped}" size="small"><Icon type="thumbsup"></Icon> {{item.ups.length}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { replyUp } from '@/api'
  export default {
    props: {
      replies: {
        type: Array,
        required: true
      }
    },
    methods: {
      likeUp(item){
        if(item.is_uped) return false
        if(item.author.loginname === this.$store.state.user.loginname){
          this.$Message.error('不能给自己点赞')
          return false
        }
        replyUp({reply_id:item.id}).then(res => {
          if(res.success){
            if(res.action === 'up'){
              item.ups.length += 1
              item.is_uped = true
            }
            if(res.action === 'down'){
              item.ups.length -= 1
              item.is_uped = false
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
.replies-header{
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  margin-bottom: 10px;
}
.replies-item{
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.replies-top{
  margin-bottom: 10px;
}
.zan-btn:hover{
  color: #80bd01;
  background-color: #fff;
  border-color: #80bd01;
}
.zan-btn.active{
  color: #80bd01;
  background-color: #fff;
  border-color: #80bd01;
}
.replies-content{
  padding: 10px;
  margin-bottom: 10px;
  background: #f5f7f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
}
.replies-content:before {
  content: '';
  display: block;
  position: absolute;
  left: 6px;
  top: -7px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #ddd;
}
.replies-content:after {
  content: '';
  display: block;
  position: absolute;
  left: 8px;
  top: -5px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #f5f7f9;
}
.replies-content >>> hr{
  height: 1px;
  border: none;
  background: #ddd;
}
.replies-btns{
  text-align: right;
}
.edit-btn:hover{
  color: #80bd01;
  border-color: #80bd01;
}
.remove-btn:hover{
  color: #80bd01;
  border-color: #80bd01;
}
</style>
