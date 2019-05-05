<template>
<!-- 界面布局 -->
  <div style='width:100%;height:100%;' id='ktusers'></div>
</template>
<script>
export default {
  name: 'mapView',
  props: {
    data: {
      type: [Object, Array]
    }
  },
  data () {
    return {
      ktusersData: {}
    }
  },
  watch: {
    data () {
      this.ktusersData = this.data
    }
  },
  mounted () {
    this.ktusersData = this.data
    this.drawKtusers()
  },
  methods: {
    drawKtusers () {
      var _this = this
      let charts = this.$echarts.init(document.getElementById('ktusers'))
      let options = {
        title: {
          text: '累计开通用户数',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {},
        grid: {
          containLabel: true,
          bottom: '0',
          left: 10,
          right: 10
        },
        legend: {
          data: ['环比', '用户数'],
          left: 'right',
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [{
          type: 'category',
          axisLine: { // 坐标轴线
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          data: _this.ktusersData.location
        }],
        yAxis: [{
          type: 'value',
          name: '环比： %',
          position: 'right',
          axisLine: { // 坐标轴线
            lineStyle: {
              color: '#666'
            }
          },
          axisLabel: {
            formatter: '{value} %'
          },
          splitLine: { // grid种的分割线
            lineStyle: {
              color: '#333',
              type: 'dashed'
            }
          }
        }, {
          type: 'value',
          name: '单位： 人',
          position: 'left',
          axisLine: { // 坐标轴线
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: { // grid种的分割线
            lineStyle: {
              color: '#333',
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '环比',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: false,
              position: 'top'
            }
          },
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          },
          data: _this.ktusersData.cicleVal
        }, {
          name: '用户数',
          type: 'bar',
          yAxisIndex: 1,
          stack: '总量',
          barWidth: 20,
          label: {
            normal: {
              show: false,
              position: 'top'
            }
          },
          // itemStyle: {
          //   normal: {
          //     color: {
          //       type: 'linear',
          //       colorStops: [{
          //         offset: 0,
          //         color: '#14c8d4'
          //       }, {
          //         offset: 1,
          //         color: '#43eec6'
          //       }]
          //     }
          //   }
          // },
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0.5, 1, [{
                offset: 0,
                color: 'rgba(35,123,105,1)'
              }, {
                offset: 1,
                color: 'rgba(103,237,210,.5)'
              }]),
              borderColor: '#23a5e2',
              borderWidth: 2,
              barBorderRadius: [5, 5, 0, 0],
              // shadowBlur:10,
              shadowColor: 'rgba(168,225,226,0.5)',
              // shadowOffsetX:10,
              // shadowOffsetY:10,
              opacity: 0.6
            },
            emphasis: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(13,164,171,1)'
              }, {
                offset: 1,
                color: 'rgba(64,180,157,.1)'
              }]),
              borderColor: '#0ea4a6',
              borderWidth: 2,
              barBorderRadius: [9, 9, 0, 0],
              shadowBlur: 30,
              shadowColor: 'rgba(32,188 ,157,0.8)',
              // shadowOffsetX:10,
              // shadowOffsetY:10,
              opacity: 0.7,
              label: {
                show: true,
                textStyle: {
                  color: 'rgba(150,197,188,1)'
                }
              }
            }
          },
          data: _this.ktusersData.value
        }]
      }
      charts.clear()
      charts.setOption(options)
      window.addEventListener('resize', function () {
        charts.resize()
      })
    }
  },
  beforeDestroy () {}

}
</script>

<style scoped></style>
