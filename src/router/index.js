import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/Accueil'
import Partie from '@/components/Partie'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/partie/:id',
      name: 'Partie',
      component: Partie
    }
  ]
})
