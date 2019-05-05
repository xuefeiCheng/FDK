<template>
<!-- 界面布局 -->
  <div style='width:100%;height:100%;' id='ljhd'></div>
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
      var _this = this
      let charts = this.$echarts.init(document.getElementById('ljhd'))
      let options = {
        grid: {
          top: 20,
          bottom: 20,
          right: 60,
          left: 40
        },
        xAxis: {
          show: false
        },
        yAxis: [{
          show: true,
          data: _this.hdljData.titlename,
          inverse: true,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          }
        }, {
          show: true,
          inverse: true,
          data: _this.hdljData.valdata,
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '内部填充',
          type: 'bar',
          yAxisIndex: 0,
          data: _this.hdljData.data,
          barWidth: 16,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: function (params) {
                var num = _this.hdljData.myColor.length
                return _this.hdljData.myColor[params.dataIndex % num]
              }
              // 渐变色
              // color: {
              //   type: 'linear',
              //   x: 0,
              //   x1: 1,
              //   colorStops: [{
              //     offset: 0,
              //     color: '#1089E7'
              //   }, {
              //     offset: 1,
              //     color: '#F57474'
              //   }]
              // }
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{c}%'
            }
          }
        }, {
          name: '外部边框',
          type: 'bar',
          yAxisIndex: 1,
          data: [100, 100, 100, 100],
          barWidth: 20,
          barGap: '-100%',
          barCategoryGap: '20px',
          itemStyle: {
            normal: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 1,
              barBorderRadius: 15
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
