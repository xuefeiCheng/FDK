<template>
<!-- 界面布局 -->
  <div style='width:100%;height:100%;' id='radarMap'></div>
</template>

<script>
import 'echarts/lib/echarts'
import '@/utils/expandEcharts/lib/autoShowTip'
export default {
  name: 'radarView',
  props: {
    data: {
      type: [Array, Object]
    }
  },
  data () {
    return {
      radarData: [],
      color: [
        '#f05b71',
        '#379bf7',
        '#face00',
        '#ff335c',
        '#5e76f4',
        '#28afff',
        '#ff675c',
        '#7dd66a',
        '#695cec',
        '#00d7e1',
        '#db2181',
        '#0082d2',
        '#00aae1',
        '#695cec',
        '#00d2aa',
        '#0dab8d',
        '#f4acb7'
      ],
      radarInterval: null
    }
  },
  watch: {
    data () {
      this.radarData = this.data
      clearInterval(this.radarInterval)
      this.radarInterval = null
      let h = this.data.length - 1
      let i = 0
      this.radarInterval = setInterval(() => {
        if (i <= h && i > 0) {
          this.drawTransferMap(this.radarData[i], false)
          i++
        } else {
          i = 0
          this.drawTransferMap(this.radarData[i], false)
          i++
        }
      }, 10000)
    }
  },
  mounted () {
    this.radarData = this.data
    let h = this.data.length
    let i = 1
    this.drawTransferMap(this.radarData[0], true)
    this.radarInterval = setInterval(() => {
      if (i < h) {
        this.drawTransferMap(this.radarData[i], false)
        i++
      } else {
        i = 0
        this.drawTransferMap(this.radarData[i], false)
        i++
      }
    }, 10000)
  },
  methods: {
    drawTransferMap (data, first) {
      let color = this.color[parseInt(10 * Math.random())]
      let charts = this.$echarts.init(document.getElementById('radarMap'))
      let option = {
        tooltip: {
          show: false
        },
        radar: {
          // shape: 'circle',
          name: {
            formatter: function (val) {
              return val
            },
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          splitNumber: 4,
          radius: 80,
          splitArea: {
            areaStyle: {
              color: 'rgba(0, 0, 0, 0)'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#B8BCC0',
              type: 'dotted',
              opacity: 0.6
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(64,183,255,0.6)'
            }
          },
          indicator: [
            { text: '最低', max: 100, flag: data.name },
            { text: '最高', max: 120, flag: data.name },
            { text: '昨日', max: 100, flag: data.name },
            { text: '平均', max: 140, flag: data.name }
          ]
        },
        series: [{
          name: '山东',
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          itemStyle: {
            normal: {
              borderColor: color,
              opacity: 1,
              borderWidth: 2,
              borderType: 'solid'
            }
          },
          lineStyle: {
            normal: {
              color: color,
              type: 'solid',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.5,
              color: color
            }
          },
          data: [data]
        }]
      }
      charts.clear()
      charts.setOption(option, true)
      window.addEventListener('resize', function () {
        charts.resize()
      })
      var radarAutoInfo = {
        hoverEnable: true,
        autoShow: true,
        formatter: function (v) {
          return v.flag + '<br/>' + v.text + ':' + v.value
        }
      }
      if (first) {
        new AutoShowTip(charts, option, 2000, radarAutoInfo)
      } else {
        charts.clearAutoShow()
        new AutoShowTip(charts, option, 2000, radarAutoInfo)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.radarInterval)
    this.radarInterval = null
  }

}
</script>

<style scoped></style>
