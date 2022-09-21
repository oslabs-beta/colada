import {createRouter, createWebHistory} from 'vue-router';
import TimelineView from '../views/TimelineView.vue';
import ChartView from '../views/ChartView.vue';
import MenuView from '../views/MenuView.vue';

const routes = [
  {
    path: '/',
    name: 'TimelineView',
    component: TimelineView,
    meta: {transition: 'slide-right'}
  },
  {
    path: '/chart',
    name: 'ChartView',
    component: ChartView,
    meta: {transition: 'slide-left'}
  },
  {
    path: '/menu',
    name: 'MenuView',
    component: MenuView,
    meta: {transition: 'slide-left'}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;