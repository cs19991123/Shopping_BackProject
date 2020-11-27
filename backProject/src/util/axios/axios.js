import axios from 'axios'

import route from '../../router'

const http = axios.create({
    baseURL:'/api'
})

// 请求拦截
http.interceptors.request.use(req=>{
    let userInfo = sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : {};
    req.headers.authorization = userInfo.token
    return req
})

// 响应拦截
http.interceptors.response.use(res=>{
    if(res.data.code==403){
        alert(res.data.msg);
        route.push('/login')
    }
    return res
})

export default http