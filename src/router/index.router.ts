import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Dashboard from "../pages/Dashboard.vue";
import NotFound from "../pages/NotFound.vue";
import { dashboardGuard } from "../guard/dashboard.guard";

const routes : Array <RouteRecordRaw> = [
    {   path : '/', name: 'Home', component: Home },
    {   path:'/dashboard', name: 'DashBoard', component: Dashboard, meta: {requiresAuth : true} },
    {   path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(dashboardGuard);

export default router;