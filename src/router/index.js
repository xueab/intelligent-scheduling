import Login from '@/views/Login'
import Reset from '@/views/Reset'
import Index from '@/views/Index'
import Schedule from '@/views/Schedule'
import StoreInformation from '@/views/StoreInformation'
import LeaveApproval from '@/views/LeaveApproval'
import ChangeSchedule from '@/views/ChangeSchedule'
import Leave from '@/views/Leave'
import Change from '@/views/Change'
import UserInfo from '@/views/UserInfo'
import Manage from '@/views/Manage'
import Router from 'vue-router'
import Schedule1 from "@/views/Schedule1.vue";
import Schedule2 from "@/views/Schedule2.vue";
import Manage1 from "@/views/Manage1.vue";
import StoreInformation1 from "@/views/StoreInformation1.vue";
import Schedule3 from "@/views/Schedule3.vue";
import StoreAdminInfo from "@/views/StoreAdminInfo.vue";
import EnterpriseAdminInfo from "@/views/EnterpriseAdminInfo.vue";
import employeeSchedule from "@/views/employeeSchedule.vue";
import employeeSchedule1 from "@/views/employeeSchedule1.vue";
import ChangeScheduleRule from "@/views/ChangeScheduleRule.vue";



export const constantRouterMap = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/Reset',
        component: Reset
    },
    {
        path: '/Index',
        component: Index,
        redirect: '/Index/Schedule',
        children:[
            {
                path: 'Schedule',
                component: Schedule
            },
            {
                path: 'Schedule1',
                component: Schedule1
            },
            {
                path: 'Schedule2',
                component: Schedule2
            },
            {
                path: 'Schedule3',
                component: Schedule3
            },
            {
                path: 'ChangeScheduleRule',
                component: ChangeScheduleRule
            },
            {
                path: 'employeeSchedule',
                component: employeeSchedule
            },
            {
                path: 'employeeSchedule1',
                component: employeeSchedule1
            },
            {
                path: 'StoreInformation',
                component: StoreInformation
            },
            {
                path: 'StoreInformation1',
                component: StoreInformation1
            },
            {
                path: 'Manage',
                component: Manage
            },
            {
                path: 'Manage1',
                component: Manage1
            },
            {
                path: 'UserInfo',
                component: UserInfo
            },
            {
                path: 'StoreAdminInfo',
                component: StoreAdminInfo
            },
            {
                path: 'EnterpriseAdminInfo',
                component: EnterpriseAdminInfo
            },
            {
                path: 'LeaveApproval',
                component: LeaveApproval
            },
            {
                path:'Leave',
                component: Leave
            },
            {
                path: 'ChangeSchedule',
                component: ChangeSchedule
            },
            {
                path: 'Change',
                component: Change
            }
        ]
    }
]

const router = new Router({
    routes: constantRouterMap
})

// router.beforeEach( (to, from, next) =>{
//     if(localStorage.email){
//         next()
//     }
//     if(to.path == '/'){
//         next()
//     }else if(!localStorage.email){
//         next('/')
//         alert('请输入您的账号密码！')
//     }
// })

export default router
