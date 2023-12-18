import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@/components/views/HomePage.vue";
import DemographicsForm from "@/components/views/DemographicsForm.vue";
import ExperimentPage from "@/components/views/ExperimentPage.vue";
import WarmUp from "@/components/views/WarmUpPage.vue";

const checkNavigationOrder = (from, expectedFromPath) => {
    if (from.path === expectedFromPath) {
      return true;
    } else {
      return false;
    }
  };

const routes = [
    {
        path: "/",
        component: HomePage
    },
    { 
        path: "/form", 
        component: DemographicsForm,
        beforeEnter: (to, from, next) => {
            if (checkNavigationOrder(from, "/")) {
              next();
            } else {
              next("/");
            }
          } 
    },
    { 
        path: "/experiment", 
        component: ExperimentPage,
        beforeEnter: (to, from, next) => {
            if (checkNavigationOrder(from, "/form") || checkNavigationOrder(from, "/warmup")) {
              next();
            } else {
              next("/form");
            }
          }
         
    },
    {
        path: "/warmup",
        component: WarmUp,
        beforeEnter: (to, from, next) => {
            if (checkNavigationOrder(from, "/form")) {
              next();
            } else {
              next("/form");
            }
          }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router;
