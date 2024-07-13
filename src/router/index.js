import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import DetailView from "../views/DetailView.vue";
import EditTask from "../views/EditTaskView.vue";
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
    path: "/login",
    name: "Login",
    component: AuthView,
  },
  {
    path: "/task/:id/detail",
    name: "Detail",
    component: DetailView,
    meta: { requiresAuth: true },
  },
  {
    path: "/task/:id/edit",
    name: "EditTask",
    component: EditTask,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
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
