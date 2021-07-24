import axios from 'axios'
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor() {
    this.baseURL = 'http://zj.jxeduyun.com/Web/'
    this.pending = {}
  }
  
  // 获取预设的配置
  getInsideConfig() {
    return {
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      timeout: 10000,
    }
  }
  // 取请求url、method、params、data等组成key，标识这次请求
  getPendingKey(config) {
    return [
      config.url,
      config.method,
      JSON.stringify(config.params),
    ].join('&')
  }
  // 移除pending请求,isFront 是否取消前面的请求
  removeKey(key, isFront = false) {
    if (this.pending[key] && isFront) {
      this.pending[key]('取消前面的重复请求')
    }
    delete this.pending[key]
  }
  // 拦截处理
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {  
        // 1、取请求标识key
        // 2、移除上一次该请求标识（如果有，则调用cancelToken取消上次请求）
        // 3、给这次请求增加cancelToken备用（如果后续有重复请求则调用）
		if(config.cancel){
      const cancelType = config.cancel
		  const key = this.getPendingKey(config)
			// 取消前面的重复请求
			if(cancelType==='before'){
              this.removeKey(key, true)
			  config.cancelToken = new CancelToken(cancel => {
				this.pending[key] = cancel
			  })
			  return config
			}else if(cancelType==='after'){
				// 取消后面的请求直接reject，要把key传下去，好在前面请求失败的时候也移除
			  if(this.pending[key]){
				return Promise.reject({key,msg:'取消后面的请求'})
			  }else{		
				this.pending[key]='after' //
				return config
			  }
			}
		}
		else{
		  return config
		}
      },
      error => {
        // 对请求错误做些什么
		   console.log(error)
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      response => {
        // 请求返回结果，移除pending
        const key = this.getPendingKey(response.config)
        this.removeKey(key)
        if (response.status === 200) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(response)
        }
      },
      error => {
		// 取消后面重复请求 响应错误同样要移除key
		if(error.key){
		  this.removeKey(error.key)
		} 
        // 对响应错误做些什么
        console.log(error.msg || error)
		
        return Promise.reject(error)
      }
    )
  }
  // 发送请求
  request(config) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), config)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get(url,data,config) {
    const options = Object.assign(
      {
        url,
		params: data,
        method: 'get'
      },
      config
    )
    return this.request(options)
  }
  post(url, data, config) {
    const options = Object.assign(
      {
        url,
        data,
        method: 'post'
      },
      config
    )
	console.log(options)
    return this.request(options)
  }
  put(url, data, config) {
    const options = Object.assign(
      {
        url,
        data,
        method: 'put'
      },
      config
    )
    return this.request(options)
  }
  delete(url,data, config) {
    const options = Object.assign(
      {
        url,
		data,
        method: 'delete'
      },
      config
    )
    return this.request(options)
  }
  // 取消全部pending请求
  cancelAll(key) {  
    for(key in this.pending){
      this.removeKey(key, true)
    }
    // 清空pengding
    this.pending = {}
  }
}
export default new HttpRequest()
