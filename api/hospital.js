import request from '@/utils/request'

export default {

  getHospitalByPage(page,limit,seqrchObj){
    return request({
        url:`/api/hospital/get/${page}/${limit}`,
        method:'post',
        params:seqrchObj
    })
  },
  getHospitalByName(seqrchObj){
    return request({
      url:`/api/hospital/likes`,
      method:'get',
      params:seqrchObj
    })
  },
  getHospitalByHosCode(hoscode){
    return request({
      url:`/api/hospital/getInfo/${hoscode}`,
      method:'get',
    })
  }
}
