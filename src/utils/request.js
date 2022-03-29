import axios from 'axios'   //引入 axios
import {MessageBox, Message} from 'element-ui'
import {getToken} from '@/utils/auth'
import store from '@/store'
import qs from 'qs'

const service = axios.create({
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.msg || '服务器出错',
                type: 'error',
                duration: 5 * 1000
            })
        }
    },
    error => {
        console.log('error' + error)
        Message({
            message: error.msg || '服务器出错',
            type: 'error',
            duration: 5 * 1000
        })
    }
)

// 请求方法
const request = {
    post(url, params) {
        return service.post(url, params, {
            transformRequest: [(params) => {
                return JSON.stringify(params)
            }],
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    put(url, params) {
        return service.put(url, params, {
            transformRequest: [(params) => {
                return JSON.stringify(params)
            }],
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    get(url, params) {
        return service.get(url, {
            params: params,
            paramsSerializer: (params) => {
                return qs.stringify(params)
            }
        })
    }
}

export default request
