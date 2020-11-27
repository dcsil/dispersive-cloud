import Vue from 'vue'
import Router from 'vue-router'

import { components, AmplifyEventBus } from 'aws-amplify-vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import AmplifyStore from './store/store';


Vue.use(Router);
Vue.use(AmplifyPlugin, AmplifyModules);

let user;

getUser().then((user, error) => {
  if (user) {
    //router.push({path: '/profile'})
  }
})

AmplifyEventBus.$on('authState', async (state) => {
  if (state === 'signedOut'){
    user = null;
    AmplifyStore.commit('setUser', null);
    router.push({path: '/auth'})
  } else if (state === 'signedIn') {
    user = await getUser();
    router.push({path: '/monitor'})
  }
});

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
    if (data && data.signInUserSession) {
      AmplifyStore.commit('setUser', data);
      return data;
    } 
  }).catch((e) => {
    AmplifyStore.commit('setUser', null);
    return null
  });
}


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue')
    },


    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue')
      
    },
    {
      path: '/monitor',
      name: 'monitor',
      meta: { requiresAuth: true},
      component: () => import(/* webpackChunkName: "ride" */ './views/Monitor.vue'),
      children:[
        {
          path:'dashboard',
          name: 'dashboard',
          meta: { requiresAuth: true},
           component: () => import(/* webpackChunkName: "ride" */ './views/Dashborad.vue'),
        },
        {
          path:'activity',
          name: 'activity',
          meta: { requiresAuth: true},
           component: () => import(/* webpackChunkName: "ride" */ './views/Activity.vue'),
        }
      ]
    },
    
  ]
});

  router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      user = await getUser();
      if (!user) {
        return next({
          path: '/auth',
          query: {
            redirect: to.fullPath,
          }
        });
      }
      return next()
    }
    return next()
  })
  
export default router