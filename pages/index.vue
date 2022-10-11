<template>

  <div
    class="home  page-component">

    <el-carousel
      indicator-position="outside">
      <el-carousel-item
        v-for="item  in  2" :key="item">
        <img src="~assets/images/web-banner1.png" alt="">
      </el-carousel-item>
    </el-carousel>
    <!--  搜索  -->
    <div class="search-container">

      <div class="search-wrapper">

        <div class="hospital-search">

          <el-autocomplete
            class="search-input"
            prefix-icon="el-icon-search"
            v-model="hosname"
            :fetch-suggestions="querySearchAsync"
            placeholder="点击输入医院名称"
            @select="handleSelect"
          >
            <span slot="suffix" class="search-btn  v-link  highlight  clickable  selected">搜索  </span>

          </el-autocomplete>
        </div>
      </div>
    </div>
    <!--  bottom  -->
    <div class="bottom">
      <div class="left">
        <div class="home-filter-wrapper">
          <div class="title">医院</div>
          <div>
            <div class="filter-wrapper">
              <span class="label">等级：</span>
              <div
                class="condition-wrapper">
                <span v-for="(item,index) in hostypeList" :key="index" class="item  v-link  clickable" :class="hostypeActiveIndex == index ?'selected':''"  @click="hostypeSelect(item.value, index)">{{item.name}} </span>
              </div>
            </div>

            <div
              class="filter-wrapper">
              <span class="label">地区：</span>
              <div class="condition-wrapper">
                <span v-for="(item,index) in districtList" :key="index"  class="item  v-link  clickable" :class="provinceActiveIndex == index ?'selected':''" @click="addressSelect(item.value, index)">{{item.name}} </span>
              </div>
            </div>
          </div>
        </div>

        <div class="v-scroll-list  hospital-list">
          <div v-for="(item,index) in list" :key="index" class="v-card  clickable  list-item  space " @click="show(item.hoscode)">
            <div class="">
              <div class="hospital-list-item  hos-item" index="0">
                <div class="wrapper">
                  <div class="hospital-title">
                    {{item.hosname}}
                  </div>
                  <div class="bottom-container">
                    <div class="icon-wrapper">
                      <span class="iconfont">{{item.param.Hostype}}</span>
                    </div>
                    <div class="icon-wrapper">
                      <span class="iconfont"></span>
                      每天{{item.bookingRule.releaseTime}}放号
                    </div>
                  </div>
                </div>
                <img :src="'data:image/jpeg;base64,'+item.logoData"
                     :alt="item.hosname"
                     class="hospital-img">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right">

        <div class="common-dept">

          <div class="header-wrapper">

            <div class="title"> 常见科室</div>

            <div
              class="all-wrapper"><span>全部</span>
              <span class="iconfont  icon"></span>
            </div>
          </div>

          <div
            class="content-wrapper">
            <span class="item  v-link  clickable  dark">神经内科  </span>
            <span class="item  v-link  clickable  dark">消化内科  </span>
            <span class="item  v-link  clickable  dark">呼吸内科  </span>
            <span class="item  v-link  clickable  dark">内科  </span>
            <span class="item  v-link  clickable  dark">神经外科  </span>
            <span class="item  v-link  clickable  dark">妇科  </span>
            <span class="item  v-link  clickable  dark">  产科  </span>
            <span class="item  v-link  clickable  dark">儿科  </span>
          </div>
        </div>

        <div
          class="space">

          <div
            class="header-wrapper">

            <div
              class="title-wrapper">

              <div
                class="icon-wrapper"><span
                class="iconfont  title-icon"></span>
              </div>
              <span class="title">平台公告</span>
            </div>

            <div
              class="all-wrapper">
              <span>全部</span>
              <span class="iconfont  icon"></span>
            </div>
          </div>

          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice  v-link  clickable  dark">关于延长北京大学国际医院放假的通知  </span>
            </div>

            <div class="notice-wrapper">

              <div class="point"></div>
              <span class="notice  v-link  clickable  dark">北京中医药大学东方医院部分科室医生门诊医  </span>
            </div>

            <div class="notice-wrapper">

              <div
                class="point"></div>
              <span class="notice  v-link  clickable  dark">  武警总医院号源暂停更新通知  </span>
            </div>
          </div>
        </div>

        <div class="suspend-notice-list  space">

          <div class="header-wrapper">

            <div class="title-wrapper">

              <div class="icon-wrapper">
                <span class="iconfont  title-icon"></span>
              </div>
              <span class="title">停诊公告</span>
            </div>
            <div
              class="all-wrapper">
              <span>全部</span>
              <span class="iconfont  icon"></span>
            </div>
          </div>

          <div class="content-wrapper">

            <div class="notice-wrapper">

              <div class="point"></div>
              <span class="notice  v-link  clickable  dark">  中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告  </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice  v-link  clickable  dark">  首都医科大学附属北京潞河医院老年医学科门诊停诊公告  </span>
            </div>

            <div
              class="notice-wrapper">

              <div
                class="point"></div>
              <span class="notice  v-link  clickable  dark">中日友好医院中西医结合心内科门诊停诊公告  </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hospitalApi from "@/api/hospital";
import dictionaryApi from "@/api/dictionary";
import hospital from "@/api/hospital";

export default {
  //只执行一次，在服务端渲染，显示医院列表
  asyncData({ params, error }) {
    return hospitalApi.getHospitalByPage(1, 10, null).then(response => {
      console.log(response.data);
      return {
        //直接在这里定义数据，框架已经封装好
        list: response.data.content,
        pages : response.data.totalPages
      }
    });
  },
  data() {
    return {
      searchObj: {},
      page: 1,
      limit: 10,

      hosname: '',
      hostypeList: [],
      districtList: [],

      hostypeActiveIndex: 0,
      provinceActiveIndex: 0
    }
  },
  created() {
    this.initData()
  },
  methods:{
    show(hoscode) {
      window.location.href = '/hospital/' + hoscode
    },
    handleSelect(item){
      window.location.href = '/hospital/' + item.hoscode
    },
    querySearchAsync(queryString,cb){
      this.searchObj={}
      this.searchObj.hosname = queryString
      hospitalApi.getHospitalByName(this.searchObj).then(response=>{
        for (let i = 0, len = response.data.length; i < len; i++) {
          //必须得设置一个value的属性，返回的对象数组中只有这个属性才会被渲染
          response.data[i].value = response.data[i].hosname
        }
        cb(response.data)
      })
    },
    getHospital(){
      hospitalApi.getHospitalByPage(this.page,this.limit,this.searchObj).then(response=>{
        for (var i = 0; i <response.data.content.length;i++){
          this.list.push(response.data.content[i]);
        }
        this.pages = response.data.totalPages
      })
    },
    hostypeSelect(hostype,index){
      this.list = []
      this.page =  1
      this.hostypeActiveIndex = index
      this.searchObj.hostype = hostype
      this.getHospital()
    },
    addressSelect(districtCode,index){
      this.list = []
      this.page =  1
      this.provinceActiveIndex = index
      this.searchObj.districtCode = districtCode
      this.getHospital()
    },
    initData(){
      dictionaryApi.getDictChildByDictCode('Hostype').then(response=>{
        this.hostypeList=[]
        this.hostypeList.push({"name":"全部","value":""})
        for (var i = 0; i <response.data.length;i++){
          this.hostypeList.push(response.data[i]);
        }
      })
      dictionaryApi.getDictChildByDictCode('Beijing').then(response=>{
        this.districtList = []
        this.districtList.push({"name":"全部","value":""})
        for (let i in response.data){
          this.districtList.push(response.data[i])
        }
      })
    }
  }
}
</script>
