<template>
<!-- 界面布局 -->
  <div style='width:100%;height:100%;' id='ljhj'></div>
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
      ljhjData: {}
    }
  },
  watch: {
    data () {
      this.ljhjData = this.data
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.ljhjData = this.data
      this.drawLjhj()
    })
  },
  methods: {
    drawLjhj () {
      var _this = this
      let charts = this.$echarts.init(document.getElementById('ljhj'))
      let options = {
        title: {
          text: '用户呼叫/拦截情况',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['拦截次数', '呼叫次数'],
          left: 'right',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          bottom: 0,
          left: 10,
          right: 10,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: _this.ljhjData.location,
          axisLine: { // 坐标轴线
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          name: '单位： 次',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#063374'
            }
          }
        }],
        series: [{
          name: '拦截次数',
          type: 'bar',
          data: _this.ljhjData.lanjietimes,
          barWidth: 10, // 柱子宽度
          barGap: 0.5, // 柱子之间间距
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#008cff'
              }, {
                offset: 1,
                color: '#005193'
              }]),
              opacity: 1
            }
          }
        }, {
          name: '呼叫次数',
          type: 'bar',
          data: _this.ljhjData.calltimes,
          barWidth: 10,
          barGap: 0.5,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00da9c'
              }, {
                offset: 1,
                color: '#007a55'
              }]),
              opacity: 1
            }
          }
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
