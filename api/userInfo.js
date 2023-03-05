import request from '@/utils/request'

export default {

  login(userInfo){
    return request({
      url:`/api/usercenter/login`,
      method:'post',
      data:userInfo
    })
  }
}
