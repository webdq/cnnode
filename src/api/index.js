import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

const cnnodeServer = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 5000
})

//拦截请求
cnnodeServer.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//拦截响应
cnnodeServer.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

//所有主题
export function getTopics(params) {
  return cnnodeServer('/topics', {params})
}

//主题详情
export function getTopicById(params) {
  const token = store.state.token
  return cnnodeServer(`/topic/${params.id}`, {
    method: "get",
    params: {
      accesstoken: token ? token : ''
    }
  })
}

//新建主题
export function addTopic(params) {
  const token = store.state.token
  return cnnodeServer('/topics', {
    method: "post",
    data: {
      title: params.title,
      tab: params.tab,
      content: params.content,
      accesstoken: token
    }
  })
}

//编辑主题
export function editTopic(params) {
  const token = store.state.token
  return cnnodeServer('/topics/update', {
    method: "post",
    data: {
      topic_id: params.id,
      title: params.title,
      tab: params.tab,
      content: params.content,
      accesstoken: token
    }
  })
}

//收藏主题
export function collectTopic(params) {
  const token = store.state.token
  return cnnodeServer('/topic_collect/collect', {
    method: "post",
    data: {
      topic_id: params.id,
      accesstoken: token
    }
  })
}

//取消主题
export function deCollectTopic(params) {
  const token = store.state.token
  return cnnodeServer('/topic_collect/de_collect', {
    method: "post",
    data: {
      topic_id: params.id,
      accesstoken: token
    }
  })
}

//用户所收藏的主题
export function getCollectTopics(params) {
  return cnnodeServer(`/topic_collect/${params.loginname}`)
}

//新建评论
export function addReply(params) {
  const token = store.state.token
  return cnnodeServer(`/topic/${params.topic_id}/replies`, {
    method: "post",
    data: {
      content: params.content,
      //reply_id: params.reply_id,
      accesstoken: token
    }
  })
}

//为评论点赞
export function replyUp(params) {
  const token = store.state.token
  return cnnodeServer(`/reply/${params.reply_id}/ups`, {
    method: "post",
    data: {
      accesstoken: token
    }
  })
}

//用户详情
export function getUser(params) {
  return cnnodeServer(`/user/${params.username}`)
}

//验证 accessToken 的正确性
export function checkToken(params) {
  return cnnodeServer('/accesstoken',{
    method: 'post',
    data: {
      accesstoken: params.token
    }
  })
}

//获取未读消息数
export function getNotReadMsg(params) {
  return cnnodeServer('/message/count',{
    data: {
      accesstoken: params.token
    }
  })
}

//获取已读和未读消息
export function getMsgAll({mdrender = false} = {}) {
  const token = store.state.token
  return cnnodeServer('/messages',{
    method: 'get',
    params: {
      accesstoken: token,
      mdrender
    }
  })
}

//标记全部已读
export function markMsgAll() {
  const token = store.state.token
  return cnnodeServer('/message/mark_all',{
    method: 'post',
    data: {
      accesstoken: token
    }
  })
}

//标记单个消息为已读
export function markMsgOne(params) {
  const token = store.state.token
  return cnnodeServer(`/message/mark_one/${params.id}`,{
    method: 'post',
    data: {
      accesstoken: token
    }
  })
}
