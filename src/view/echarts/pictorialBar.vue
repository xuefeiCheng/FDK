<template>
<!-- 象形柱状图 界面布局 -->
  <div style='width:100%;height:100%;' id='pictorialBar'></div>
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
      hdljData: {}
    }
  },
  watch: {
    data () {
      this.hdljData = this.data
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.hdljData = this.data
      this.drawLjhd()
    })
  },
  methods: {
    drawLjhd () {
      // var _this = this
      let charts = this.$echarts.init(document.getElementById('pictorialBar'))
      var maxData = 2000
      let options = {
        tooltip: {},
        xAxis: {
          max: maxData,
          splitLine: {
            show: false
          },
          offset: 2,
          axisTick: {
            show: false
          },
          Line: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          data: ['用户周拦截率'],
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 15,
            padding: [0, 0, 40, 0],
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        grid: {
          top: 'center',
          // height: 200,
          left: 120,
          right: 10
        },
        series: [{ // 外边框
          name: '',
          type: 'pictorialBar',
          symbol: 'reat',
          // barWidth: '10%',
          symbolOffset: ['-1%', 0], // 位置
          symbolSize: ['102%', 24],
          itemStyle: {
            normal: {
              color: 'rgba(54,215,182,0.27)'
            }
          },
          z: -180, // 图层
          symbolRepeat: null,
          symbolBoundingData: maxData,
          data: [1200],
          animationEasing: 'elasticOut'
        },
        { // 内边框
          name: '',
          type: 'pictorialBar',
          symbol: 'reat',
          // barWidth: '9%',
          // barMaxWidth: '20%',
          symbolOffset: ['-0.5%', 0],
          symbolSize: ['101%', 22],
          itemStyle: {
            normal: {
              color: 'black'
            }
          },
          z: -20,
          symbolRepeat: null,
          symbolBoundingData: maxData,
          data: [1200],
          animationEasing: 'elasticOut'
        },
        {
          // current data
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            normal: {
              color: '#36d7b6'
            }
          },
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolClip: true,
          symbolSize: 20,
          symbolBoundingData: maxData,
          data: [1200],
          z: 99999999,
          animationEasing: 'elasticOut',
          animationDelay: function (dataIndex, params) {
            return params.index * 30
          }
        }, {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: 'rgba(54,215,182,0.27)'
            }
          },
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return parseFloat((params.value / maxData) * 100) + '%'
              },
              position: 'left',
              offset: [-15, 10],
              textStyle: {
                color: 'yellow',
                fontSize: 18
              }
            }
          },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbol: 'rect',
          symbolSize: 20,
          symbolBoundingData: maxData,
          data: [1200],
          z: 99999,
          animationEasing: 'elasticOut',
          animationDelay: function (dataIndex, params) {
            return params.index * 30
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
