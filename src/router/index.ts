import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { usePermissStore } from '../store/permiss'
import Home from '../views/home.vue'
// https://router.vuejs.org/zh/api/#routerecordraw
const routes: RouteRecordRaw[] = [
    {
        path:'/',
        redirect:'/dashboard'
    }
    ,{  
        path:'/',
        name:'Home',
        component:Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    permiss: '1'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格',
                    permiss: '2'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/table.vue")
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签',
                    permiss: '3'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tabs.vue")
            },
            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单',
                    permiss: '5'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/form.vue")
            },
            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传文件',
                    permiss: '6'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/upload.vue")
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    permiss: '8'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/editor.vue')
            },
            {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '9'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/markdown.vue')
            },
            {
                path: '/icon',
                name: 'icon',
                meta: {
                    title: '自定义图标',
                    permiss: '10'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/icon.vue')
            },
            {
                path: '/charts',
                name: 'charts',
                meta: {
                    title: '图表',
                    permiss: '11'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/charts.vue')
            },
            {
                path: '/permission',
                name: 'permission',
                meta: {
                    title: '权限管理',
                    permiss: '13'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/permission.vue')
            },
            {
                path: '/donate',
                name: 'denate',
                meta: {
                    title: '鼓励作者',
                    permiss: '14'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/donate.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/user.vue')
            }]
    }
    ,{
        path:'/login',
        name:'login',
        meta:{
            title:'登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/login.vue")
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '页面不存在'
        },
        component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
    },
    // 所有未定义路由，全部重定向到404页
    // 匹配所有路径
    // vue2 使用 *
    // vue3 使用 /:pathMatch(.*)*或/:pathMatch(.*)或 /:catchAll(.*)
    {
        // vue3对404配置进行了修改,必须使用正则匹配
        path: "/:catchAll(.*)",// 不识别的path自动匹配404
        redirect:'/404'
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    // 标签页标题    
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username')
    const permiss = usePermissStore()
    if (!role && to.path !== '/login'){
        next('/login')

    }else if(to.meta.permiss && !permiss.key.includes(to.meta.permiss)){
        // 如果没有权限，则进入403
        next('/403')

    }else{
        next()
    }

})
export default router;