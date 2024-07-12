import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Task from "../views/AboutView.vue";
import AuthView from "../views/AuthView.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/task/:id",
    name: "Task",
    component: Task,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: AuthView,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
