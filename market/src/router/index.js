/* eslint-disable no-empty */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../page/Login'


Vue.use(VueRouter)

const router = new VueRouter({

    routes: [
        {
            path: '/',
            component: Login
        },

        {
            path: '/home',
            component: () => import('../page/Home'),
            children: [
                {
                    path: '/home/upload',
                    component: () => import('../page/Upload')

                },
                {//商品管理
                    path: '/home/goods',
                    component: () => import('../page/Goods/Goods'),
                },
                {//添加商品
                    path: '/home/addgoods',
                    component: () => import('../page/Goods/AddGoods'),
                },
                {//账号管理
                    path: '/home/user',
                    component: () => import('../page/Account/User'),
                },
                {//修改密码
                    path: '/home/changepwd',
                    component: () => import('../page/Account/ChangePwd'),
                },
                {//增加账号
                    path: '/home/addaccount',
                    component: () => import('../page/Account/AddAccount'),
                },
                {//库存管理
                    path: '/home/stock',
                    component: () => import('../page/Stock/Stock'),
                },
                {//添加库存
                    path: '/home/addstock',
                    component: () => import('../page/Stock/AddStock'),
                },
                {//销售列表
                    path: '/home/sell',
                    component: () => import('../page/Sell/Sell'),
                },
                {//商品出库
                    path: '/home/sellout',
                    component: () => import('../page/Sell/SellOut'),
                },
                {//商品退货
                    path: '/home/sellback',
                    component: () => import('../page/Sell/SellBack'),
                },
                {//销售统计
                    path: '/home/countout',
                    component: () => import('../page/Count/CountOut'),
                },
                {//进货统计
                    path: '/home/countin',
                    component: () => import('../page/Count/CountIn'),
                },

            ]
        }
    ],

})


export default router
