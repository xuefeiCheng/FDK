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
              <div class="bs-sons">halle</div>
              <div class="bs-sons">halle</div>
              <div class="bs-sons">halle</div>
            </div>
            <!-- 右侧列表滚动 -->
            <div class="list border-all">
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
          <div style="height:calc(100% - 45px);width:100%;background-color:red;"></div>
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
import {gettime} from '@/utils/methods'
import {chinaOpt, chinaData, chinaData1, zhejiangOpt, zhejiangData, zhejiangData1, radarData, radarData1, ljhdData, ktusersData, ljhjData, ljtimesForeach} from 'static/data/data'
export default {
  name: 'bigScreen',
  data () {
    return {
      timeString: '',
      options: {
        border: true,
        shape: 'triangle'
      },
      items: ['列表第一项', '列表项目2', '这是第三条', '第四条信息'],
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
        ljtimesForeach: ljtimesForeach // 户均拦截次数
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
    Radar, ljhdMap, ktusersMap, ljhjMap, ljForeachMap
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
  .bs-header-right .bs-sons .bs-icon-font .bs-title{height:30px;line-height:30px;font-size:20px;}
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
    padding: 10px 15px;
  }
  /* 滚动列表 */
  .list {
    position: absolute;
    width: 300px;
    height: 500px;
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
    flex: 1 1 69.5%;
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
  .bs-body-right .bs-body-bottom {
    flex: 1 1 29.5%;
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
