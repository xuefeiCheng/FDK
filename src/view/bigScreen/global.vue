<template>
<!-- 界面布局 -->
  <div class="bs-box">
    <div class="bs-header flex">
      <div class="bs-header-left">
        <div class="bs-title">高频骚扰防范业务</div>
        <div class="bs-title-subtext">High Frequency Harassment Protection Business</div>
      </div>
      <div class="bs-header-right flex flex-space-between">
        <div class="bs-sons border-all"></div>
        <div class="bs-sons border-all"></div>
        <div class="bs-sons border-all"></div>
        <div class="bs-sons border-all"></div>
        <div class="bs-sons border-all"></div>
      </div>
    </div>
    <div class="bs-body flex flex-space-between">
      <div class="bs-body-left flex flex-direction-column flex-space-between">
        <div class="bs-body-top">
          <box-border :options="options">
            <Map v-on:drawAgain = 'say'
              :data1 = 'echartaData.chinaData'
              :data2 = 'echartaData.zhejiangData'
              :options = 'echartsOpt'
            ></Map>
            <div class="bs-timer">(数据截止至<span style="color: yellow">{{timeString}}</span>)</div>
            <!-- 左侧展示框 -->
            <!-- 右侧列表滚动 -->
            <div class="list border-all">
              <scroll :items='items' :speed='speedVal'></scroll>
            </div>
          </box-border>
        </div>
        <div class="bs-body-bottom border-all flex">
          <div class="bs-sons"></div>
          <div class="bs-sons"></div>
          <div class="bs-sons"></div>
        </div>
      </div>
      <div class="bs-body-right flex flex-direction-column flex-space-between">
        <div class="bs-body-top border-all"></div>
        <div class="bs-body-bottom border-all"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../echarts/map'
import {gettime} from '@/utils/methods'
import {chinaOpt, chinaData, chinaData1, zhejiangOpt, zhejiangData, zhejiangData1} from 'static/data/data'
export default {
  name: 'bigScreen',
  data () {
    return {
      timeString: '2019/04/12 19:00',
      options: {
        border: true,
        shape: 'triangle'
      },
      items: ['列表第一项', '列表项目2', '这是第三条', '第四条信息'],
      speedVal: 3000,
      echartaData: {
        chinaData: chinaData,
        zhejiangData: zhejiangData
      }, // 向下传递数据
      echartsOpt: {
        chinaOpt: chinaOpt,
        zhejiangOpt: zhejiangOpt
      }, // 向下传递配置
      interval: null
    }
  },
  components: {
    Map
  },
  mounted () {
    this.timeString = gettime()
    this.interval = setInterval(() => {
      this.timeString = gettime()
      if (this.echartaData.zhejiangData === zhejiangData) {
        this.echartaData.zhejiangData = zhejiangData1
        this.echartaData.chinaData = chinaData1
      } else {
        this.echartaData.zhejiangData = zhejiangData
        this.echartaData.chinaData = chinaData
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
    flex: 0 0 23.5%;
    box-sizing: border-box;
  }
  .bs-header .bs-header-right {
    flex: 0 0 76.5%;
  }
  .bs-header-right .bs-sons {
    width: 200px;
    height: 100%;
    /* flex布局下，指定子元素 垂直居中 */
    align-items: center;
  }

  /* body部分 */
  .bs-body {
    width: 100%;
    height: 92%;
  }
  .bs-body .bs-body-left {
    flex:0 0 76%;
  }
  .bs-body-left .bs-body-top {
    flex:0 0 70%;
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
    flex:0 0 29%;
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
    flex:0 0 23%;
  }
  .bs-body-right .bs-body-top {
    flex:0 0 49.5%;
  }
  .bs-body-right .bs-body-bottom {
    flex:0 0 49.5%;
  }
</style>
