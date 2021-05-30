import {get,post} from './http'
import store from '@/store'
import axios1 from 'axios'

export const login = data => post('/app/v1_0/authorizations',data)

export const sendSms = (mobile) => get(`/app/v1_0/sms/codes/${mobile}`)

/*
*获取用户信息
* */
export const getCurrentUser = () => {
    // get('/app/v1_0/user', { headers: { Authorization: `Bearer ${store.state.user.token}`}})
return axios1({
    method:'GET',
    url:'http://ttapi.research.itcast.cn/app/v1_0/user',
    headers:{
        Authorization: `Bearer ${store.state.user.token}`
    }
})
}