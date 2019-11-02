import axios from 'axios'

export  const IP = 'http://127.0.0.1:8888';

const ax = axios.create({
    baseURL: IP//默认地址
})


//登录
export const login = (account, password) => ax.post('/login', { account, password })
//添加账号
export const addAccuont = (account, password, userGroup) => ax.post('/addaccount', { account, password, userGroup })
//删除账号
export const removeAccount = (id) => ax.get('/removeaccount', {
    params: {
        id
    }
})
//修改密码
export const changePwd = (id, oldPwd, newPwd) => ax.post('/changepwd', { id, oldPwd, newPwd })

//获取所有账户
export const account = (currentPage, pageSize) => ax.get('/user', {
    params: {
        currentPage, pageSize
    }
})

//检查token
export const token = (token) => ax.get('/gettoken', {
    params: {
        token
    }
})



//添加商品
export const addGoods = (AddGoods) => ax.get('/addgoods', { params: AddGoods })

//获取商品和搜索商品
export const goods = (currentPage, pageSize, keyWorld, category) => ax.get('/goods', {
    params: {
        currentPage, pageSize, keyWorld, category
    }
})

////删除账号
export const removeGood = (id) => ax.get('/removegood', {
    params: {
        id
    }
})

//修改商品信息
export const updataGoods = (AddGoods) => ax.get('/updatagoods', { params: AddGoods })
