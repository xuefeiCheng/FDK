<template>
<!-- 象形柱状图 界面布局 -->
  <div style='width:100%;height:100%;' id='ljWeek'></div>
</template>
<script>
export default {
  name: 'pictorialBar',
  props: {
    data: {
      type: [Object, Array]
    }
  },
  data () {
    return {
      ljWeekData: {}
    }
  },
  watch: {
    data () {
      this.ljWeekData = this.data
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.ljWeekData = this.data
      this.drawLjhd()
    })
  },
  methods: {
    drawLjhd () {
      var _this = this
      let charts = this.$echarts.init(document.getElementById('ljWeek'))
      var num = _this.ljWeekData.num
      var time = _this.ljWeekData.time
      let options = {
        title: {
          text: '拦截次数日趋势',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        grid: {
          bottom: 20,
          left: 15,
          right: 20,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          data: time
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#063374',
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '拦截次数',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)'
            }
          },
          data: num
        }]
        // {
        //   areaStyle: {
        //     normal: {
        //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //           offset: 0,
        //           color: 'rgba(0, 136, 212, 0.3)'
        //         }, {
        //           offset: 0.8,
        //           color: 'rgba(0, 136, 212, 0)'
        //         }], false),
        //       shadowColor: 'rgba(0, 0, 0, 0.1)',
        //       shadowBlur: 10
        //     }
        //   }
        // }, {
        //   areaStyle: {
        //     normal: {
        //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //           offset: 0,
        //           color: 'rgba(219, 50, 51, 0.3)'
        //         }, {
        //           offset: 0.8,
        //           color: 'rgba(219, 50, 51, 0)'
        //         }], false),
        //       shadowColor: 'rgba(0, 0, 0, 0.1)',
        //       shadowBlur: 10
        //     }
        //   }
        // }
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
