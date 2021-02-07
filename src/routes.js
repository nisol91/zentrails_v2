
// import Bookables from "./components/bookables/Bookables";
// import Bookable from "./components/bookable/Bookable";
// import VerifyEmail from "./components/auth/VerifyEmail";
// import ForgotPassword from "./components/auth/ForgotPassword";
// import ResetPassword from "./components/auth/ResetPassword";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import Review from "./components/review/Review";

import App from "./App.vue";

import MHome from "./components/metamorphosis/MHome.vue";
import MWeAre from "./components/metamorphosis/MWeAre.vue";
import MWeDo from "./components/metamorphosis/MWeDo.vue";
import MWeTell from "./components/metamorphosis/MWeTell.vue";
import MShop from "./components/metamorphosis/MShop.vue";
import MContacts from "./components/metamorphosis/MContacts.vue";
import MBlogPost from "./components/metamorphosis/MBlogPost.vue";
import MSingleWork from "./components/metamorphosis/MSingleWork.vue";

import HomeZentrails from "./components/zentrails/HomeZentrails.vue";





import Register from "./components/auth/Register.vue";
import Login from "./components/auth/Login.vue";
import UserProfile from "./components/user/UserProfile";
import Projects from "./components/portfolio/Projects";
import SingleProject from "./components/portfolio/SingleProject";
import Portfolio from "./components/portfolio/Portfolio";
import ForgotPassword from "./components/auth/ForgotPassword";
import ToccaVinoHome from "./components/toccavino/ToccaVinoHome";
import ToccaVinoAddEvent from "./components/toccavino/ToccaVinoAddEvent";
import ToccaVinoEditEvent from "./components/toccavino/ToccaVinoEditEvent";
import ToccaVinoProducts from "./components/toccavino/ToccaVinoProducts";
import EditMyLists from "./components/toccavino/EditMyLists";
import ToccaVinoPayment from "./components/toccavino/ToccaVinoPayment";
import ToccaVinoBasket from "./components/toccavino/ToccaVinoBasket";
import NotFound from "./components/shared/components/NotFound";

import VueRouter from "vue-router";
import firebase from 'firebase'

import store from "./store"

const routes = [
    {
        path: "/quasarEx",
        component: App,
        name: "exampleQuasar"
    },
    {
        path: "/",
        component: HomeZentrails,
        name: "homeZentrails",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
    },
    {
        path: "/m-home",
        component: MHome,
        name: "mHome",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
    },
    {
        path: "/m-we-are",
        component: MWeAre,
        name: "mWeAre",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
    },
    {
        path: "/m-we-do",
        component: MWeDo,
        name: "mWeDo",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
    },
    {
        path: "/m-we-do/:id",
        component: MSingleWork,
        name: "mSingleWork",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
        beforeEnter: (to, from, next) => {
            window.scrollTo(0, 0);
            next()
        }
    },
    {
        path: "/m-we-tell/:id",
        component: MBlogPost,
        name: "mBlogPost",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
        beforeEnter: (to, from, next) => {
            window.scrollTo(0, 0);
            next()

        }
    },
    {
        path: "/m-we-tell",
        component: MWeTell,
        name: "mWeTell",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
    },
    {
        path: "/m-contacts",
        component: MContacts,
        name: "mContacts",
        // protezione della rotta se non loggato
        // beforeEnter: (to, from, next) => {
        //     if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
        //     else next()
        // }
    },
    {
        path: "/m-shop",
        component: MShop,
        name: "mShop",
        // protezione della rotta se non loggato
        beforeEnter: (to, from, next) => {
            if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
            else next()
        }
    },
    {
        path: "/projects",
        component: Projects,
        name: "projects"
    },
    {
        path: "/project/:id",
        component: SingleProject,
        name: "project"
    },
    {
        path: "/auth/login",
        component: Login,
        name: "login"
    },
    {
        path: "/auth/register",
        component: Register,
        name: "register"
    },
    {
        path: "/auth/forgot-password",
        name: "forgotPassword",
        component: ForgotPassword,
        // protezione della rotta se non loggato
        beforeEnter(to, from, next) {
            const user = firebase.auth().currentUser;
            if (user) {
                next({ name: "home" });
            } else {
                next();
            }
        },
    },
    {
        path: "/userProfile",
        component: UserProfile,
        name: "userProfile",
        // protezione della rotta se non loggato
        beforeEnter: (to, from, next) => {
            if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'home' })
            else next()
        }
    },
    {
        path: "/editLists",
        component: EditMyLists,
        name: "editLists",
        // protezione della rotta se non loggato
        beforeEnter: (to, from, next) => {
            if (to.name !== 'login' && localStorage.getItem("isLoggedIn") === "false") next({ name: 'toccaVinoHome' })
            else next()
        }
    },
    {
        path: "/basket",
        component: ToccaVinoBasket,
        name: "toccaVinoBasket"
    },
    {
        path: "/",
        component: ToccaVinoHome,
        name: "toccaVinoHome"
    },
    {
        path: "/tocca-vino-products",
        component: ToccaVinoProducts,
        name: "toccaVinoProducts"
    },
    {
        path: "/edit-wine-event/:id",
        component: ToccaVinoEditEvent,
        name: "toccaVinoEditEvent",
        // protezione della rotta se non loggato
        afterEnter: (to, from, next) => {
            if (to.name !== 'login' && !store.state.isLoggedIn) next({ name: 'home' })
            else next()
        }
    },
    {
        path: "/add-wine-event",
        component: ToccaVinoAddEvent,
        name: "toccaVinoAddEvent",
        // protezione della rotta se non loggato
        afterEnter: (to, from, next) => {
            if (to.name !== 'login' && !store.state.isLoggedIn) next({ name: 'home' })
            else next()
        }
    },
    {
        path: "/support-us",
        component: ToccaVinoPayment,
        name: "toccaVinoPayment"
    },
    { path: '*', component: NotFound }

    // // un altro modo alternativo per importare un componente vue
    // {
    //     path: "/auth/login",
    //     component: require('./components/auth/Login.vue').default,
    //     name: "login"
    // },
    // {
    //     path: "/laravelBnB",
    //     component: Bookables,
    //     name: "laravelBnB"
    // },
    // {
    //     path: "/adminDashboard",
    //     component: AdminDashboard,
    //     name: "adminDashboard"
    // },
    // {
    //     path: "/verify-email",
    //     component: VerifyEmail,
    //     name: "verifyEmail"
    // },
    // {
    //     path: "/forgot-password",
    //     component: ForgotPassword,
    //     name: "forgotPassword"
    // },
    // {
    //     path: "/reset-password",
    //     component: ResetPassword,
    //     name: "resetPassword"
    // },
    // {
    //     path: "/bookable/:id",
    //     component: Bookable,
    //     name: "bookable"
    // },
    // {
    //     path: "/reviews/:id",
    //     component: Review,
    //     name: "review"
    // },


]

const router = new VueRouter({
    mode: 'history',
    routes,
})

// mi serve per scrollare sempre al top quando cambio rotta
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);

    // More code ...
    next();
});

export default router;
