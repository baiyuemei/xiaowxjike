// http.js  
  
import { baseURL, tokenStorageKey } from './request.js';  
  
// 添加请求拦截器  
function addRequestInterceptor(url, method, data, header) {  
  const token = wx.getStorageSync(tokenStorageKey);  
  if (token) {  
    // 如果有token，添加到请求头  
    header['Authorization'] = `Bearer ${token}`;  
  }  
  return { url, method, data, header };  
}  
  
// 封装 wx.request  
function request(options) {  
  return new Promise((resolve, reject) => {  
    const { url, method, data, header } = addRequestInterceptor(options.url, options.method, options.data, options.header || {});  
    wx.request({  
      url: baseURL + url,  
      method: method,  
      data: data,  
      header: header,  
      success: (res) => {  
        if (res.statusCode === 200 || res.statusCode === 201) {  
          resolve(res.data);  
        } else {  
          reject(new Error('请求失败: ' + res.statusCode));  
        }  
      },  
      fail: (error) => {  
        reject(error);  
      }  
    });  
  });  
}  
  
// 导出封装好的请求函数  
export const get = (url, data = {}) => request({ url, method: 'GET', data});  
export const post = (url, data = {}) => request({ url, method: 'POST', data });  
  
// ... 可以继续扩展其他HTTP方法