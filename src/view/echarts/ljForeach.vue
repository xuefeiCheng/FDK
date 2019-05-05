<template>
<!-- 界面布局 -->
  <div style='width:100%;height:100%;' id='ljForeach'></div>
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
      this.ljtimesForeach = this.data
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.ljtimesForeach = this.data
      this.drawLjforeach()
    })
  },
  methods: {
    drawLjforeach () {
      var _this = this
      var barHeight = 300
      let charts = this.$echarts.init(document.getElementById('ljForeach'))
      let options = {
        title: {
          text: '户均拦截次数情况',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['范围', '均值'],
          left: 'right',
          textStyle: {
            color: '#fff'
          }
        },
        angleAxis: {
          type: 'category',
          data: _this.ljtimesForeach.location,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            show: true,
            color: '#fff'
          }
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            var id = params.dataIndex
            return _this.ljtimesForeach.location[id] + '<br>最低：' + _this.ljtimesForeach.data[id][0] + '<br>最高：' + _this.ljtimesForeach.data[id][1] + '<br>平均：' + _this.ljtimesForeach.data[id][2]
          }
        },
        radiusAxis: {
          axisLine: {
            show: true,
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
          },
          axisLabel: {
            show: true,
            color: '#fff'
          }
        },
        polar: {
          center: ['50%', '55%'],
          radius: '75%'
        },
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          data: _this.ljtimesForeach.data.map(function (d) {
            return d[0]
          }),
          coordinateSystem: 'polar',
          stack: '最大最小值',
          silent: true
        }, {
          type: 'bar',
          data: _this.ljtimesForeach.data.map(function (d) {
            return d[1] - d[0]
          }),
          coordinateSystem: 'polar',
          name: '范围',
          stack: '最大最小值'
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          data: _this.ljtimesForeach.data.map(function (d) {
            return d[2] - barHeight
          }),
          coordinateSystem: 'polar',
          stack: '均值',
          silent: true,
          z: 10
        }, {
          type: 'bar',
          data: _this.ljtimesForeach.data.map(function (d) {
            return barHeight * 2
          }),
          coordinateSystem: 'polar',
          name: '均值',
          stack: '均值',
          barGap: '-100%',
          z: 10
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
