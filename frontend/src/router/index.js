import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/pages/HomePage.vue');
const Details = () => import('@/pages/DetailPage.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nft/:id',
    name: 'NFTDetails',
    component: Details
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
