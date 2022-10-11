import request from '@/utils/request'

export default {
  getDepartmentTree(hosCode){
    return request({
      url:`/api/hospital/get/department/${hosCode}`,
      method:'get',

    })
  }
}
