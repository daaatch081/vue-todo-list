import Vue from "vue";
import Router from "vue-router";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import TODO from "./views/TODO.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "TODO",
      component: TODO,
    },
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
    },
  ],
});
