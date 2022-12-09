import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/post/:postId',
    name: 'specificPost',
    props: true,
    component: () => import('@/views/Post.vue')
  },
  {
    path: '/add-post',
    name: 'addPost',
    props: true,
    component: () => import('@/views/AddPost.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
