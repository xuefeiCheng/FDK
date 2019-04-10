<template>
<!-- 广西大屏 世界地图 备份 -->
    <div style='width:100%; height:100%;background:linear-gradient(#020b25, #0e2566, #020b25);' id='bigMap'></div>
</template>

<script>
import nameMap from '@/utils/nameMap.js'
import 'echarts/lib/echarts'
import 'echarts/map/js/china.js'
import 'echarts/map/js/world.js'
// 下钻 可以参考这个 加载不同省份的js文件
import 'echarts/map/js/province/guangxi.js'
export default {
  name: 'bigScreen',
  data () {
    return {
      transferData: []
    }
  },
  mounted () {
    this.drawTransferMap()
  },
  methods: {
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
    drawTransferMap () {
      // 获取echarts画布
      let charts = this.$echarts.init(document.getElementById('bigMap'))
      // 初始化地图
      let options = {
        title: {
          show: true,
          text: '诈骗源国家分布周统计',
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
              if (params.name !== '' && params.name != null) {
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
          map: 'world',
          label: {
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          nameMap: nameMap,
          itemStyle: {
            normal: {
              borderColor: 'rgba(37, 142, 183, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(11, 37, 108, .5)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(11, 37, 108, 1)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          }
        },
        series: this.transferData
      }

      charts.setOption(options)
      window.addEventListener('resize', function () {
        charts.resize()
      })

      if (this.transferData.length < 1) {
        let series = []

        // 获取热力图数据
        series.push({
          name: '区域',
          type: 'map',
          map: 'world',
          geoIndex: 0,
          data: [
            {name: '中国', value: '79604'},
            {name: '美国', value: '27097'}
          ]
        })

        // 获取迁徙图数据
        let data = [
          {
            d_city: '广西',
            d_latitude: 23.1152,
            d_longitude: 108.479,
            num: 2666,
            s_city: '美国',
            s_latitude: 40.238205,
            s_longitude: -111.67633
          },
          {
            d_city: '广西',
            d_latitude: 23.1152,
            d_longitude: 108.479,
            num: 233,
            s_city: '英国',
            s_latitude: 51.5077,
            s_longitude: -0.12797
          }
        ]
        series.push({
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: 'circle',
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
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            normal: {
              color: '#9ae5fc'
            }
          },
          data: data.map(function (dataItem) {
            return {
              name: dataItem.s_city,
              value: [dataItem.s_longitude, dataItem.s_latitude]
            }
          })
        },
        {
          // 终点设置点
          name: '广西',
          type: 'effectScatter',
          zlevel: 2,
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'stroke'
          },
          symbolSize: 13,
          itemStyle: {
            normal: {
              color: 'red'
            }
          },
          data: [
            {'name': '广西', 'value': [108.479, 23.1152, '广西']}
          ]
        })

        charts.setOption({
          series: series
        })
      }

      return charts
    }
  }

}
</script>

<style>

</style>
