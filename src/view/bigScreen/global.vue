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
            <div style='width:100%;height:100%;' id='bigMap'></div>
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
import 'echarts/lib/echarts'
import nameMap from '@/utils/nameMap.js'
import JsonList from '@/utils/expandEcharts/index'
import {chinaOpt, chinaData, zhejiangOpt, zhejiangData} from 'static/data/data'
import {loopShowTooltip} from '@/utils/expandEcharts/lib/echarts-tooltip-carousel'
export default {
  name: 'bigScreen',
  data () {
    return {
      options: {
        border: true,
        shape: 'triangle'
      }
    }
  },
  mounted () {
    this.drawTransferMap(chinaOpt, chinaData)
  },
  methods: {
    checkCity (city) {
      let res = false
      const list = ['浙江', '杭州市', '宁波市', '温州市', '绍兴市', '湖州市', '嘉兴市', '金华市', '衢州市', '台州市', '丽水市', '舟山市']
      res = list.indexOf(city) !== -1 // 存在返回下标,即不为-1,则 res 为true
      return res
    },
    convertData (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var fromCoord = [dataItem.s_longitude, dataItem.s_latitude]
        var toCoord = [dataItem.d_longitude, dataItem.d_latitude]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem.s_city,
            toName: dataItem.d_city,
            coords: [fromCoord, toCoord],
            value: dataItem.num
          })
        }
      }
      return res
    },
    drawTransferMap (opt, data) {
      var _this = this
      let charts = this.$echarts.init(document.getElementById('bigMap'))
      // 自定义地图
      this.$echarts.registerMap('china', JsonList[opt.name])
      // 初始化地图
      let options = {
        title: {
          show: true,
          text: opt.title.text || '标题',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          top: 20,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.seriesType === 'effectScatter') {
              return params.data.name + '' + params.data.value[2]
            } else if (params.seriesType === 'lines') {
              return params.data.fromName + '>' + params.data.toName + ':' + params.data.value
            } else if (params.seriesType === 'map') {
              if (params.data) {
                return params.data.name + ':' + params.data.value
              } else {
                return ''
              }
            } else {
              return params.name
            }
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 10000,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          },
          textStyle: {
            color: '#000'
          }
        },
        geo: {
          map: 'china',
          label: {
            // normal: {
            //   show: true,
            //   textStyle: {
            //     color: '#fff'
            //   }
            // },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          center: opt.geo.center || [104.114129, 37.550339],
          zoom: opt.geo.zoom || 5,
          scaleLimit: opt.geo.scaleLimit || {min: 5},
          regions: opt.geo.regionsList || [{
            name: opt.geo.regions.name || '中国',
            // label: {
            //   normal: {
            //     show: false
            //   }
            // },
            itemStyle: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 0,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(6, 18, 51, .5)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(6, 18, 51, 1)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 30
            }
          }],
          roam: opt.geo.roam || true, // true scale move
          nameMap: nameMap,
          itemStyle: {
            normal: {
              borderColor: 'rgba(37, 142, 183, .3)',
              borderWidth: 1,
              areaColor: 'rgba(0, 0, 0, .3)'
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          }
        },
        series: [
          {
            // 区域热力值
            name: '区域热力值',
            type: 'map',
            geoIndex: 0,
            data: [
              {name: '山东', value: '79604'},
              {name: '广西', value: '6523'}
            ]
          },
          {
            // 散点图 去向点
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              normal: {
                color: '#FFC848',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            symbolSize: 13,
            data: data.map(function (dataItem) {
              return {
                name: dataItem.s_city,
                value: [dataItem.s_longitude, dataItem.s_latitude, '数量']
              }
            })
          },
          // {
          //   // 散点图 来向点
          //   type: 'effectScatter',
          //   coordinateSystem: 'geo',
          //   rippleEffect: {
          //     brushType: 'stroke'
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#FFC848',
          //       shadowBlur: 10,
          //       shadowColor: '#333'
          //     }
          //   },
          //   symbolSize: 13,
          //   data: data.map(function (dataItem) {
          //     return {
          //       name: dataItem.d_city,
          //       value: [dataItem.d_longitude, dataItem.d_latitude, dataItem.d_city]
          //     }
          //   })
          // },
          {
            // 画线
            type: 'lines',
            symbol: ['circle', 'circle'],
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: 'arrow',
              symbolSize: 16
            },
            lineStyle: {
              normal: {
                color: '#9ae5fc',
                width: 1,
                opacity: 0.8,
                curveness: 0.2
              }
            },
            data: this.convertData(data)
          }
          // {
          //   // 特殊点单独设置
          //   // 终点设置点
          //   name: '广西',
          //   type: 'effectScatter',
          //   coordinateSystem: 'geo',
          //   rippleEffect: {
          //     brushType: 'stroke'
          //   },
          //   symbolSize: 13,
          //   itemStyle: {
          //     normal: {
          //       color: 'red'
          //     }
          //   },
          //   data: [
          //     {'name': '广西', 'value': [108.479, 23.1152, '广西']}
          //   ]
          // }
        ]
      }
      // 设置options前 清空画布，防止缓存
      charts.clear()
      charts.setOption(options)
      loopShowTooltip(charts, options, {loopSeries: false, seriesIndex: 1, interval: 5000})
      window.addEventListener('resize', function () {
        charts.resize()
      })
      charts.on('click', function (params) {
        var _self = this
        if (_this.checkCity(params.name) && opt.goDown) {
          _self.clear()
          // 关闭 点击事件 否则重复触发点击
          _self.off('click')
          _this.drawTransferMap(zhejiangOpt, zhejiangData)
        } else if (!(_this.checkCity(params.name)) && !opt.goDown) {
          _self.clear()
          _self.off('click')
          _this.drawTransferMap(chinaOpt, chinaData)
        } else {
          // console.log('click budong')
        }
      })
      return charts
    }
  },
  beforeDestroy () {}

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
    padding: 5px 0;
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
