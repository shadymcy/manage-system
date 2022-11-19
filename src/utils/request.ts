import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";


const service:AxiosInstance = axios.create({
    // 请求超时设置，单位为毫秒
    timeout: 5000
})
// 配置请求拦截器
service.interceptors.request.use(
    // req=>{...}, 对发起的请求进行处理，方法写在{}中，req是请求参数
    // err=>{...}, 出现请求错误时进行的处理
    (config: AxiosRequestConfig) => {
        return config
    },
    (error: AxiosError) => {
        console.log(error)
        return Promise.reject()
    }
)
// 配置响应拦截器
service.interceptors.response.use(
    // res=>{...}, 对响应进行处理，方法写在{}中，res是返回数据
	// err=>{...}, 出现请求错误时进行的处理
    (response: AxiosResponse) => {
        if (response.status === 200){
            return response
        } else{
            return Promise.reject()
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject()
        
    }
)

export default service