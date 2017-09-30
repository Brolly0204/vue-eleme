import Vue from 'vue';
import Router from 'vue-router';
import GoodList from '@/pages/goodList';
import Ratings from '@/components/Ratings';
import Seller from '@/components/Seller';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '*',
      redirect: '/goods'
    }
  ]
});
