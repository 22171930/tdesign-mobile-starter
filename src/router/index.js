import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home/index.vue';
import User from '../pages/home/user/MyManagement.vue';
import dateSelection from '../pages/dateSelection/index.vue';
import regionSelection from '../pages/regionSelection/index.vue'
import ApplicantInformation from '../pages/applicant_information/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/applicant_information',
    name: 'ApplicantInformation',
    component: ApplicantInformation
  },
  {
    path: '/dateSelection',
    name: 'dateSelection',
    component: dateSelection
  },
  {
    path:'/regionSelection',
    name:'regionSelection',
    component:regionSelection
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
