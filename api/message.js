import request from '@/utils/request'

export default {

  getCode(phone){
    return request({
      url:`/api/message/send/${phone}`,
      method:'post',
    })
  }
}
