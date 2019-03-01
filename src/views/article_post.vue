<template>
  <div class="article-wrap">
    <div class="article-post">
      <h2 class="post-title">
        <Icon type="ios-plus" size="18"></Icon>
        发表主题
      </h2>

      <Form ref="formArticle" :model="formArticle" :rules="formRules" :label-width="90">
        <p style="padding-left: 90px; margin-bottom: 5px; color: #9ea7b4;">测试文章请选择 [ 客户端测试 ] ，否则可能会被封号</p>
        <FormItem label="选择版块：" prop="tab">
          <Select v-model="formArticle.tab" style="width:300px">
            <Option v-for="item in articleType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="文章标题：" prop="title">
          <Input v-model="formArticle.title" placeholder="标题字数10字以上" style="width: 300px" />
        </FormItem>
        <FormItem label="文章内容：" prop="content">
          <MarkdownEditor v-model="formArticle.content" @on-blur="handleContentBlur" :options="options" :localCache="false"></MarkdownEditor>
        </FormItem>
        <div style="padding-left: 90px;">
          <Button class="post-btn" type="primary" @click="handleSubmit('formArticle')" long>提交</Button>
        </div>
      </Form>

    </div>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/markdown.vue'
  import { addTopic } from '@/api'
  export default {
    data(){
      return {
        articleType: [
          {
            label: '请选择',
            value: ''
          },
          {
            label: '分享',
            value: 'share'
          },
          {
            label: '问答',
            value: 'ask'
          },
          {
            label: '招聘',
            value: 'job'
          },
          {
            label: '客户端测试',
            value: 'dev'
          }
        ],
        formArticle: {
          tab: '',
          title: '',
          content: ''
        },
        formRules: {
          tab: [{ required: true, message: '请选择版块', trigger: 'change' }],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            {
              validator: function(rule, value, callback){
                if(value.length < 10){ callback(new Error('标题最少10个字符')) }else{ callback() }
              },
              trigger: 'blur'
            }
          ],
          content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
        },
        options: {
          toolbar: ['bold','italic','|','quote','unordered-list','ordered-list','|','link','image','|','guide','preview'],
          spellChecker: false,
          status: false
        }
      }
    },
    computed: {
    },
    methods: {
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            addTopic({
              ...this.formArticle
            }).then(res => {
              if(res.success){
                this.$Message.success('发布成功')
                this.$router.push(`/detail/${res.topic_id}`)
              }else{
                this.$Message.error(`发布失败,${res.error_msg}`)
              }
            }).catch((err) => {
              this.$Message.error('发布失败')
            })
          }
        })
      },
      handleContentBlur(value){
        this.$refs['formArticle'].validateField('content', (err) => {
          //console.log(err)
        })
      }
    },
    components: {
      MarkdownEditor
    }
  }
</script>

<style scoped>
.post-title{
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  font-size: 16px;
}
.post-btn{
  color: #fff;
  background-color: #80bd01;
  border-color: #80bd01;
}
.ivu-form-item-error >>> .editor-toolbar{
  border-color: #ed3f14;
}
.ivu-form-item-error >>> .CodeMirror{
  border-left-color: #ed3f14;
  border-right-color: #ed3f14;
  border-bottom-color: #ed3f14;
}
</style>
