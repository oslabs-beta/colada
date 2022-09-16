import {createRouter, createWebHistory} from 'vue-router'
import Timeline from '../views/Timeline.vue'
import Chart from '../views/Chart.vue'
import Menu from '../views/Menu.vue'

const routes = [
    {
        path: '/',
        name: 'Timeline',
        component: Timeline,
        meta: {transition: 'slide-right'}
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart,
        meta: {transition: 'slide-left'}
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu,
        meta: {transition: 'slide-left'}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router