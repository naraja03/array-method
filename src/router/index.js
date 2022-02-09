import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Task1 from "../components/Task1.vue"
import Task2 from "../components/Task2.vue"
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/task1',
    name: 'Task1',
    component: Task1
},
{
    path: '/task2',
    name: 'Task2',
    component: Task2
}, ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router