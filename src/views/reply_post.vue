<template>
  <div class="reply">
    <h3 class="reply-header">{{title}}</h3>
    <Form ref="formReply" :model="formReply" :rules="formRules">
      <FormItem prop="content">
        <MarkdownEditor v-model="formReply.content" @on-blur="handleContentBlur" :options="options" :localCache="false"></MarkdownEditor>
      </FormItem>
      <Button class="reply-btn" type="primary" @click="handleSubmit('formReply')" long>提交</Button>
    </Form>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/markdown.vue'
  import { addReply } from '@/api'
  export default {
    props: {
      articleId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: '添加回复'
      }
    },
    data(){
      return {
        formReply: {
          content: ''
        },
        formRules: {
          content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
        },
        options: {
          toolbar: ['bold','italic','|','quote','unordered-list','ordered-list','|','link','image','|','guide','preview'],
          spellChecker: false,
          status: false
        }
      }
    },
    methods: {
      handleSubmit(name){
        let topic_id = this.articleId
        let content = this.formReply.content
        this.$refs[name].validate((valid) => {
          if(valid){
            addReply({ topic_id, content }).then((res) => {
              if(res.success){
                this.formReply.content = ''
                this.$Message.success('评论成功')
                this.$emit('reply-post')
              }else{
                this.$Message.error(`评论失败,${res.error_msg}`)
              }
            }).catch((err) => {
              this.$Message.error('评论失败')
            })
          }
        })
      },
      handleContentBlur(value){
        this.$refs['formReply'].validateField('content', (err) => {
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
.reply{
  margin-bottom: 10px;
}
.reply-btn{
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
.reply-header{
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
