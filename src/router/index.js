import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Favorites from "../views/Favorites.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites,
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
