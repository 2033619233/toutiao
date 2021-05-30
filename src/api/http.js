import axios from 'axios'
import store from '@/store'

const axios1 = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
    timeout: 3000,
});

axios1.interceptors.request.use(function (config) {
    const {user} = store.state
    if(user){
        console.log(user);
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios1.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // if (error.response.status) {
    //     switch (error.response.status) {
    //         case 401:
    //             router.replace({
    //                 path: '/login',
    //                 query: { redirect: router.currentRoute.fullPath }
    //             });
    //             break;
    //         case 403:
    //             Toast({
    //                 message: '登录过期，请重新登录',
    //                 duration: 1000,
    //                 forbidClick: true
    //             });
    //             localStorage.removeItem('token');
    //             store.commit('loginSuccess', null);
    //             setTimeout(() => {
    //                 router.replace({
    //                     path: '/login',
    //                     query: {
    //                         redirect: router.currentRoute.fullPath
    //                     }
    //                 });
    //             }, 1000);
    //             break;
    //         case 404:
    //             Toast({
    //                 message: '网络请求不存在',
    //                 duration: 1500,
    //                 forbidClick: true
    //             });
    //             break;
    //         default:
    //             Toast({
    //                 message: error.response.data.message,
    //                 duration: 1500,
    //                 forbidClick: true
    //             });
    //         }
    //     }
    return Promise.reject(error);
});

export default axios1

export function get(url, data={}) {
    return new Promise((resolve, reject) => {
        axios1.get(url, {
            params:data
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function post(url,data) {
    return new Promise((resolve, reject) => {
        axios1.post(url,data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err,'请求错误')
            })
    })
}