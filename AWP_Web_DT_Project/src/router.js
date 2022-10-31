import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "@/components/MainPage";
import EmailsPage from "@/components/EmailsPage";
import EmailPage from "@/components/EmailPage";
import AboutPage from "@/components/AboutPage";
import FurtherPage from "@/components/FurtherPage";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/emails', component: EmailsPage },
        { path: '/emails/:id', component: EmailPage },
        { path: '/about', component: AboutPage },
        { path: '/further', component: FurtherPage },
    ]
});

export default router;
