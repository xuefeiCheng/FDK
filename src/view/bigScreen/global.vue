<template>
<!-- 界面布局 -->
  <div class="bs-box">
    <div class="bs-header flex">
      <div class="bs-header-left">
        <div class="bs-title">高频骚扰防范业务</div>
        <div class="bs-title-subtext">High Frequency Harassment Protection Business</div>
      </div>
      <div class="bs-header-right flex flex-space-between">
        <div v-for="item in itemsData" :key="item.id">
          <div class="bs-sons">
            <div class="bs-icon" :style="{backgroundImage:'url(/static/img/bigscreen/'+item.url+'.png)'}"></div>
            <div class="bs-icon-font">
              <div class="bs-title">{{item.title}}</div>
              <div class="bs-subtext"><span class="bs-subtext-num">{{item.val}} </span>万</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bs-body flex flex-space-between">
      <div class="bs-body-left flex flex-direction-column flex-space-between">
        <div class="bs-body-top">
          <box-border :options="options">
            <Map v-on:drawAgain = 'say'
              :data1 = 'echartaData.chinaData'
              :data2 = 'echartaData.zhejiangData'
              :timeString = 'timeString'
              :options = 'echartsOpt'
            ></Map>
            <!-- <div class="bs-timer">(数据截止至<span style="color: yellow">{{timeString}}</span>)</div> -->
            <!-- 左侧展示框 -->
            <div class="bs-show-box">
              <div class="bs-sons">
                <div class="bs-title">总呼叫次数</div>
                <div class="bs-subtext-num">509.992</div>
              </div>
              <div class="bs-sons">
                <div class="bs-title">拦截次数</div>
                <div class="bs-subtext-num">108.992</div>
              </div>
              <div class="bs-sons">
                <div class="bs-title">拦截用户数</div>
                <div class="bs-subtext-num">1142</div>
              </div>
            </div>
            <!-- 右侧列表滚动 -->
            <div class="list">
              <scroll :items='items' :speed='speedVal'></scroll>
            </div>
          </box-border>
        </div>
        <div class="placeHolder"></div>
        <div class="bs-body-bottom border-all flex">
          <div class="bs-sons">
            <ktusers-map :data = 'echartaData.ktusersData'></ktusers-map>
          </div>
          <div class="bs-sons">
            <ljhj-map :data = 'echartaData.ljhjData'></ljhj-map>
          </div>
          <div class="bs-sons">
            <!-- <Radar :data='echartaData.radarData'></Radar> -->
            <lj-foreach-map :data = 'echartaData.ljtimesForeach'></lj-foreach-map>
          </div>
        </div>
      </div>
      <div class="placeHolder"></div>
      <div class="bs-body-right flex flex-direction-column flex-space-between">
        <div class="bs-body-top border-all">
          <div class="body-title">拦截效率</div>
          <div style="height:calc(100% - 45px);width:100%;">
            <!-- 数据总览 -->
            <div class="flex flex-space-between bs-show-box-1">
              <div class="bs-sons">
                <div class="bs-title">用户日拦截率</div>
                <div class="bs-subtext-num">14 %</div>
              </div>
              <div class="bs-sons">
                <div class="bs-title">通话日拦截率</div>
                <div class="bs-subtext-num">14 %</div>
              </div>
              <div class="bs-sons">
                <!-- 分辨率小的时候需要单独处理 -->
                <div class="bs-title">用户日均拦截次数</div>
                <div class="bs-subtext-num">445282</div>
              </div>
            </div>
            <!-- 单轴 -->
            <div style="height:82px;width:100%;">
              <pictorial-bar :data = 'echartaData.pictorialBarData'></pictorial-bar>
            </div>
            <!-- 折线图 -->
            <div style="height:calc(100% - 160px);width:100%;">
              <lj-week :data = 'echartaData.ljWeekData'></lj-week>
            </div>
          </div>
        </div>
        <div class="placeHolder"></div>
        <div class="bs-body-bottom border-all">
          <div class="body-title">拦截号段占比</div>
          <div style="height:calc(100% - 45px);width:100%;">
            <ljhd-map :data = 'echartaData.ljhdData'></ljhd-map>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../echarts/map'
import Radar from '../echarts/radar'
import ljhdMap from '../echarts/ljhd'
import ktusersMap from '../echarts/ktusers'
import ljhjMap from '../echarts/ljhj'
import ljForeachMap from '../echarts/ljForeach'
import pictorialBar from '../echarts/pictorialBar'
import ljWeek from '../echarts/ljWeek'
import {gettime} from '@/utils/methods'
import {chinaOpt, chinaData, chinaData1, zhejiangOpt, zhejiangData, zhejiangData1, radarData, radarData1, ljhdData, ktusersData, ljhjData, ljtimesForeach, pictorialBarData, ljWeekData} from 'static/data/data'
export default {
  name: 'bigScreen',
  data () {
    return {
      timeString: '',
      options: {
        border: true,
        shape: 'triangle'
      },
      items: [
        {
          time: '16:03',
          city: '北京',
          num: 652
        },
        {
          time: '16:03',
          city: '天津',
          num: 1009
        },
        {
          time: '16:03',
          city: '上海',
          num: 232
        },
        {
          time: '16:03',
          city: '浙江',
          num: 2016
        },
        {
          time: '16:03',
          city: '山东',
          num: 2016
        },
        {
          time: '16:03',
          city: '广西',
          num: 2016
        },
        {
          time: '16:03',
          city: '四川',
          num: 2016
        },
        {
          time: '16:03',
          city: '福建',
          num: 2016
        },
        {
          time: '16:03',
          city: '广州',
          num: 2016
        },
        {
          time: '16:03',
          city: '河南',
          num: 2016
        }
      ],
      itemsData: [
        {
          id: 1,
          url: 'user',
          title: '累计开通用户数',
          val: 65.2
        },
        {
          id: 2,
          url: 'add',
          title: '累计拦截次数',
          val: 65.2
        },
        {
          id: 3,
          url: 'wechat',
          title: '累计关注用户数',
          val: 65.2
        },
        {
          id: 4,
          url: 'intercept_add',
          title: '昨日拦截次数',
          val: 65.2
        },
        {
          id: 5,
          url: 'intercept',
          title: '昨日拦截用户数',
          val: 65.2
        }
      ], // header 数据总览部分
      speedVal: 3000,
      echartaData: {
        chinaData: chinaData,
        zhejiangData: zhejiangData,
        radarData: radarData,
        ljhdData: ljhdData, // 拦截号码段
        ktusersData: ktusersData, // 开通用户数
        ljhjData: ljhjData, // 拦截/呼叫情况
        ljtimesForeach: ljtimesForeach, // 户均拦截次数
        pictorialBarData: pictorialBarData, // 用户周拦截率
        ljWeekData: ljWeekData // 拦截次数最近7天日趋势
      }, // 向下传递数据
      echartsOpt: {
        chinaOpt: chinaOpt,
        zhejiangOpt: zhejiangOpt
      }, // 向下传递配置
      interval: null
    }
  },
  components: {
    Map,
    Radar, ljhdMap, ktusersMap, ljhjMap, ljForeachMap, pictorialBar, ljWeek
  },
  created () {
    this.timeString = gettime()
  },
  mounted () {
    this.interval = setInterval(() => {
      this.timeString = gettime()
      if (this.echartaData.zhejiangData === zhejiangData) {
        this.echartaData.zhejiangData = zhejiangData1
        this.echartaData.chinaData = chinaData1
        this.echartaData.radarData = radarData1
      } else {
        this.echartaData.zhejiangData = zhejiangData
        this.echartaData.chinaData = chinaData
        this.echartaData.radarData = radarData
      }
    }, 60000)
  },
  methods: {
    say (params) {
      console.log('接收到信息---' + params)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.interval = null
  }
}
</script>

<style scoped>
  /* 大屏样式 */
  .bs-box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 25px;
    background:linear-gradient(#020b25, #0e2566, #020b25);
  }
  .bs-header {
    width: 100%;
    height: 8%;
    min-height: 80px;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .bs-title {
    color: #fff;
    font-size: 32px;
    /* font-weight: bold; */
  }
  .bs-title-subtext {
    color: #eee;
    font-size: 14px;
  }
  .bs-timer {
    color: #fff;
    font-size: 16px;
    line-height: 64px;
    width: 260px;
    position: absolute;
    top: 30px;
    right: 50%;
    margin-right: -130px;
    /* margin-right: -340px; */
  }
  .bs-header .bs-header-left {
    flex: 1 1 23.5%;
    box-sizing: border-box;
  }
  .bs-header .bs-header-right {
    flex: 1 1 76.5%;
  }
  .bs-header-right .bs-sons {
    width: 215px;
    height: 57px;
    line-height: 57px;
    /* flex布局下，指定子元素 垂直居中 */
    align-items: center;
    background: url(/static/img/bigscreen/border.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
  }
  /* header 数据总览部分 */
  .bs-header-right .bs-sons .bs-icon{width:43px;height:43px;margin:0 5px;background-color:red;background: url(/static/img/bigscreen/user.png) no-repeat center;background-size: 100% 90%;}
  .bs-header-right .bs-sons .bs-icon-font{height:57px;width:172px;color:#fff;padding:0 5px;}
  .bs-header-right .bs-sons .bs-icon-font .bs-title{height:30px;line-height:30px;font-size:18px;}
  .bs-header-right .bs-sons .bs-icon-font .bs-subtext-num{height:27px;line-height:27px;font-size:20px;font-family: 'timerFont';color: yellow;}  
  .bs-header-right .bs-sons .bs-icon-font .bs-subtext{height:27px;line-height:27px;font-size:14px;}

  /* body部分 */
  .bs-body {
    width: 100%;
    height: 92%;
  }
  .bs-body .bs-body-left {
    flex: none;
    width: 76%;
  }
  .bs-body-left .bs-body-top {
    flex: 1 1 70%;
  }
  /* 地图右侧数据展示框 */
  .bs-show-box {
    position:absolute;
    width:210px;
    top:10px;
    left:10px;
  }
  .bs-show-box .bs-sons {
    width:100%;
    height:96px;
    background: url(/static/img/bigscreen/bg.png) no-repeat center;
    background-size: 100% 100%;
    margin-bottom:5px;
    box-sizing: border-box;
    padding: 15px;
  }
  .bs-show-box .bs-sons .bs-title{
    font-size: 16px;
  }
  .bs-show-box .bs-sons .bs-subtext-num {
    font-family: 'timerFont';
    font-size: 30px;
    text-align: center;
    color: lightblue;
  }
  /* 滚动列表 */
  .list {
    position: absolute;
    width: 300px;
    height: 385px;
    overflow: hidden;
    top: 10px;
    right: 10px;
  }
  .bs-body-left .bs-body-bottom {
    flex: 1 1 29%;
    box-sizing: border-box;
    padding: 5px 0;
  }
  .bs-body-bottom .bs-sons {
    flex: 1;
    box-sizing: border-box;
    padding: 5px;
    border-right: 2px solid #269fed73;
  }
  .bs-body-bottom .bs-sons:last-child {
    border-right: 0;
  }
  .bs-body .bs-body-right {
    flex: none;
    width: 23%;
  }
  .bs-body-right .bs-body-top {
    flex: 1 1 59.5%;
  }
  .bs-body-right .body-title {
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color:  #fff;
    font-weight: bold;
    border-bottom: 1px solid #269fed73;
    box-sizing: border-box;
    padding: 0 10px;
  }
  /* 拦截效率 数据总览部分 */
  .bs-body-right .bs-body-top .bs-show-box-1{
    height:78px;box-sizing: border-box;padding:10px 5px;
  }
  .bs-body-right .bs-body-top .bs-show-box-1 .bs-sons{
    flex:1;
    margin:0 5px;
    height:58px;
    background: url(/static/img/bigscreen/bg1.png) no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding:5px;
  }
  .bs-show-box-1 .bs-sons .bs-title{
    font-size: 14px;
  }
  .bs-show-box-1 .bs-sons .bs-subtext-num {
    font-family: 'timerFont';
    font-size: 18px;
    text-align: center;
    color: yellow;
  }
  .bs-body-right .bs-body-bottom {
    flex: 1 1 39.5%;
  }
/* 占位符 */
  .placeHolder {
    flex: 1 1 1%;
  }
    @media screen and (max-width: 1446px){
    .placeHolder {
      background-color: red;
    }
    .bs-title {
      color: #fff;
      font-size: 28px;
      /* font-weight: bold; */
    }
    .bs-title-subtext {
      color: #eee;
      font-size: 12px;
    }
    .bs-header-right .bs-sons {
      width: 150px;
      height: 100%;
      /* flex布局下，指定子元素 垂直居中 */
      align-items: center;
    }
    .bs-header-right .bs-sons .bs-icon-font{height:57px;width:107px;color:#fff;padding: 0;}
    .bs-header-right .bs-sons .bs-icon-font .bs-title{height:30px;line-height:30px;font-size:14px;}
    .bs-header-right .bs-sons .bs-icon-font .bs-subtext-num{height:27px;line-height:27px;font-size:14px;font-family: 'timerFont';color: yellow;}  
    .bs-header-right .bs-sons .bs-icon-font .bs-subtext{height:27px;line-height:27px;font-size:12px;}
  }
</style>
