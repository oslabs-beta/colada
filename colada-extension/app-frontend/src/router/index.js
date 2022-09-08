import {createRouter, createWebHistory} from 'vue-router'
import Timeline from '../views/Timeline.vue'
import Chart from '../views/Chart.vue'

const routes = [
    {
        path: '/',
        name: 'Timeline',
        component: Timeline
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router