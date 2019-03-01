const ArticleList = () => import('@/views/article_list')
const ArticleDetail = () => import('@/views/article_detail')
const Login = () => import('@/views/login')
const User = () => import('@/views/user')
const ArticlePost = () => import('@/views/article_post')
const ArticleCollect = () => import('@/views/article_collect')
const Messages = () => import('@/views/messages')
import menu from '@/router/menu'

menu.forEach(item => {
  item.component = ArticleList
})

let routes = [
  {
    path: '/',
    redirect: '/all'
  },
  ...menu,
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/detail/:id',
    name: 'article_detail',
    component: ArticleDetail
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User
  },
  {
    path: '/post',
    name: 'article_post',
    component: ArticlePost
  },
  {
    path: '/collect',
    name: 'article_collect',
    component: ArticleCollect
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages
  },
  {
    path: '*',
    redirect: '/all'
  }
]

export default routes
