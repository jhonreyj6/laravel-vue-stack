import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "../stores/userStore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Intro",
            component: () =>
                import(/* webpackChunkName: "Intro" */ "../views/Home.vue"),
            meta: {
                disableIfLoggedIn: true,
                title: "J6 Cafe",
            },
        },

        {
            path: "/about",
            name: "About",
            component: () =>
                import(/* webpackChunkName: "Intro" */ "../views/About.vue"),
        },

        {
            path: "/:catchAll(.*)",
            name: "404",
            component: () =>
                import(/* webpackChunkName: "Intro" */ "../views/404.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ?? "Welcome to J6 Cafe";

    if (to.matched.some((record) => record.meta.disableIfSubscribed)) {
        if (userStore().subscription) {
            next({ path: "/dashboard", query: { redirect: to.fullPath } });
            return false;
        }
    }

    if (to.matched.some((record) => record.meta.requiresSubscribe)) {
        if (!userStore().subscription) {
            next({ path: "/dashboard", query: { redirect: to.fullPath } });
            return false;
        }
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!userStore().access_token) {
            userStore().$reset();
            next({ path: "/login", query: { redirect: to.fullPath } });
            return false;
        }
    }

    if (to.matched.some((record) => record.meta.disableIfLoggedIn)) {
        if (userStore().access_token) {
            next({ path: "/dashboard", query: { redirect: to.fullPath } });
            return false;
        }
    }

    next();
});

export default router;
