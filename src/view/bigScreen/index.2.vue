<template>
<!-- 备份 box-border组件 地图下钻 等测试 -->
  <div style="width:100%;height:100%">
    <div style='width:100%; height:100%;background:linear-gradient(#020b25, #0e2566, #020b25);' id='bigMap'></div>
    <div style="width:100%;height:10%;display:flex;position: absolute;top: 0;">
      <box-border :options="options">
        <div style="width:100%;height:100%;" @click="say">hhhhh</div>
      </box-border>
      <box-border :options="options">
        <div style="width:100%;height:100%;" @click="say">hhhhh</div>
      </box-border>
      <box-border :options="options">
        <div style="width:100%;height:100%;" @click="say">hhhhh</div>
      </box-border>
      <box-border :options="options">
        <div style="width:100%;height:100%;" @click="say">hhhhh</div>
      </box-border>
      <box-border :options="options">
        <div style="width:100%;height:100%;" @click="say">hhhhh</div>
      </box-border>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/echarts'
import nameMap from '@/utils/nameMap.js'
import JsonList from '@/utils/expandEcharts/index'
const chinaOpt = {
  goDown: true,
  level: 1,
  title: {
    text: '国家'
  },
  geo: {
    map: 'china',
    center: [104.114129, 37.550339],
    zoom: 5,
    regions: {
      name: '中国'
    }
  }
}
// 获取迁徙图数据
const chinaData = [
  {
    d_city: '广西',
    d_latitude: 23.1152,
    d_longitude: 108.479,
    num: 2666,
    s_city: '山东',
    s_latitude: 36.65,
    s_longitude: 117
  },
  {
    d_city: '广西',
    d_latitude: 23.1152,
    d_longitude: 108.479,
    num: 233,
    s_city: '浙江',
    s_latitude: 30.26,
    s_longitude: 120.19
  }
]
const zhejiangOpt = {
  goDown: false,
  level: 2,
  title: {
    text: '浙江'
  },
  geo: {
    map: '浙江',
    center: [119.652866, 29.085903],
    zoom: 7,
    regions: {
      name: '浙江'
    }
  }
}
const zhejiangData = [
  {
    d_city: '杭州市',
    d_latitude: 30.287459,
    d_longitude: 120.153576,
    num: 2666,
    s_city: '宁波市',
    s_latitude: 29.868388,
    s_longitude: 121.549792
  },
  {
    d_city: '嘉兴市',
    d_latitude: 30.762653,
    d_longitude: 120.750865,
    num: 233,
    s_city: '台州市',
    s_latitude: 28.661378,
    s_longitude: 121.428599
  }
]
export default {
  name: 'bigScreen',
  data () {
    return {
      transferData: [],
      options: {
        border: true,
        shape: 'triangle'
      }
    }
  },
  mounted () {
    // 自定义地图
    this.$echarts.registerMap('china', JsonList.china)
    this.$echarts.registerMap('浙江', JsonList.zhejiang)
    this.drawTransferMap(chinaOpt, chinaData)
  },
  methods: {
    say () {
      alert('jajja')
    },
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
          res.push([
            {
              coord: fromCoord,
              s_city: dataItem.s_city
            }, {
              coord: toCoord,
              d_city: dataItem.d_city,
              num: dataItem.num
            }
          ])
        }
      }
      return res
    },
    drawTransferMap (opt, data) {
      var _this = this
      let charts = this.$echarts.init(document.getElementById('bigMap'))
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
            if (params.componentSubType === 'lines') {
              return params.data.s_city + '> ' + params.data.d_city + ' ' + params.data.num + '条'
            } else if (params.componentSubType === 'map') {
              if (params.name !== '' && params.name != null && params.value) {
                return params.name + ': ' + params.value + '条'
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
          map: opt.geo.map || 'china',
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
          regions: [{
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
          roam: true,
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
          // {
          //   // 区域热力值
          //   name: '区域热力值',
          //   type: 'map',
          //   geoIndex: 0,
          //   data: [
          //     {name: '山东', value: '79604'},
          //     {name: '广西', value: '6523'}
          //   ]
          // },
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
                value: [dataItem.s_longitude, dataItem.s_latitude, dataItem.s_city]
              }
            })
          },
          {
            // 散点图 来向点
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
                name: dataItem.d_city,
                value: [dataItem.d_longitude, dataItem.d_latitude, dataItem.d_city]
              }
            })
          },
          {
            // 画线
            type: 'lines',
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

      charts.setOption(options)
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
          console.log('click budong')
        }
      })
      return charts
    }
  }

}
</script>

<style>

</style>
