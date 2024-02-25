//封装 wx.setStorageSync

export function setToken(tokenKey,token){
  return wx.setStorageSync(tokenKey,token)
}

export function getToken(tokenKey){
  return wx.getStorageSync(tokenKey)
}

export function removeToken(tokenKey){
  return wx.removeStorageSync(tokenKey)
}