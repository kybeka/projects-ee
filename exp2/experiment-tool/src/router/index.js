import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@/components/views/HomePage.vue";
import DemographicsForm from "@/components/views/DemographicsForm.vue";
import ExperimentPage from "@/components/views/ExperimentPage.vue";
import WarmUp from "@/components/views/WarmUpPage.vue";



const routes = [
    {
        path: "/",
        component: HomePage
    },
    { 
        path: "/form", 
        component: DemographicsForm 
    },
    { 
        path: "/experiment", 
        component: ExperimentPage 
    },
    {
        path: "/warmup",
        component: WarmUp
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router;