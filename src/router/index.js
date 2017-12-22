import Vue from 'vue';
import Router from 'vue-router';
import InterestCalculator from '@/components/InterestCalculator';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InterestCalculator',
      component: InterestCalculator,
    },
  ],
});
