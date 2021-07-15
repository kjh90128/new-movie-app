import { createRouter, createWebHashHistory } from 'vue-router'

import About from './About'
import Movie from './Movie'
import Home from './Home'
import NotFound from './NotFound'

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(){
    return{ top: 0 }
  },
  routes:[
    {
      path:'/',
      component:Home
    },
    {
      path:'/About',
      component:About
    },
    {
      path:'/Movie/:id',
      component:Movie
    },
    {
      path:'/:notFound(.*)',
      component:NotFound
    }
  ]
})