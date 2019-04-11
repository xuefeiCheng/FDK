<template>
<!-- 自动轮播 -->
  <div style="width:100%;height:100%;background:linear-gradient(#020b25, #0e2566, #020b25);box-sizing: border-box;">
    <div style="width:80%;height:80%;margin:auto">
      <box-border :options="options">
        <div style='width:100%;height:100%;' id='bigMap'></div>
      </box-border>
    </div>
    <div style="width:80%;height:10%;margin:auto;font-family:timerFont">
      <box-border :options="options">
        <scroll :items='items' :speed='speedVal'></scroll>
      </box-border>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/echarts'
import nameMap from '@/utils/nameMap.js'
import JsonList from '@/utils/expandEcharts/index'
import {loopShowTooltip} from '@/utils/expandEcharts/echarts-tooltip-carousel'
const chinaOpt = {
  name: 'china',
  goDown: true,
  level: 1,
  title: {
    text: '国家'
  },
  geo: {
    center: [104.114129, 37.550339],
    zoom: 5,
    roam: true,
    scaleLimit: {min: 1},
    regions: {
      name: '中国'
    },
    regionsList: [{
      name: '南海诸岛',
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
    },
    {
      name: '中国',
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
    }]
  }
}
const zhejiangOpt = {
  name: 'zhejiang',
  goDown: false,
  level: 2,
  title: {
    text: '浙江'
  },
  geo: {
    center: [119.652866, 29.085903],
    zoom: 7,
    roam: true,
    scaleLimit: {min: 1},
    regions: {
      name: '浙江'
    }
  }
}
// 地点经纬度查询表
var geoCoordMap = {
  '上海': [121.4648, 31.2891],
  '东莞': [113.8953, 22.901],
  '东营': [118.7073, 37.5513],
  '中山': [113.4229, 22.478],
  '临汾': [111.4783, 36.1615],
  '临沂': [118.3118, 35.2936],
  '丹东': [124.541, 40.4242],
  '丽水': [119.5642, 28.1854],
  '乌鲁木齐': [87.9236, 43.5883],
  '佛山': [112.8955, 23.1097],
  '保定': [115.0488, 39.0948],
  '兰州': [103.5901, 36.3043],
  '包头': [110.3467, 41.4899],
  '北京': [116.4551, 40.2539],
  '北海': [109.314, 21.6211],
  '南京': [118.8062, 31.9208],
  '南宁': [108.479, 23.1152],
  '南昌': [116.0046, 28.6633],
  '南通': [121.1023, 32.1625],
  '厦门': [118.1689, 24.6478],
  '台州': [121.1353, 28.6688],
  '合肥': [117.29, 32.0581],
  '呼和浩特': [111.4124, 40.4901],
  '咸阳': [108.4131, 34.8706],
  '哈尔滨': [127.9688, 45.368],
  '唐山': [118.4766, 39.6826],
  '嘉兴': [120.9155, 30.6354],
  '大同': [113.7854, 39.8035],
  '大连': [122.2229, 39.4409],
  '天津': [117.4219, 39.4189],
  '太原': [112.3352, 37.9413],
  '威海': [121.9482, 37.1393],
  '宁波': [121.5967, 29.6466],
  '宝鸡': [107.1826, 34.3433],
  '宿迁': [118.5535, 33.7775],
  '常州': [119.4543, 31.5582],
  '广州': [113.5107, 23.2196],
  '廊坊': [116.521, 39.0509],
  '延安': [109.1052, 36.4252],
  '张家口': [115.1477, 40.8527],
  '徐州': [117.5208, 34.3268],
  '德州': [116.6858, 37.2107],
  '惠州': [114.6204, 23.1647],
  '成都': [103.9526, 30.7617],
  '扬州': [119.4653, 32.8162],
  '承德': [117.5757, 41.4075],
  '拉萨': [91.1865, 30.1465],
  '无锡': [120.3442, 31.5527],
  '日照': [119.2786, 35.5023],
  '昆明': [102.9199, 25.4663],
  '杭州': [119.5313, 29.8773],
  '枣庄': [117.323, 34.8926],
  '柳州': [109.3799, 24.9774],
  '株洲': [113.5327, 27.0319],
  '武汉': [114.3896, 30.6628],
  '汕头': [117.1692, 23.3405],
  '江门': [112.6318, 22.1484],
  '沈阳': [123.1238, 42.1216],
  '沧州': [116.8286, 38.2104],
  '河源': [114.917, 23.9722],
  '泉州': [118.3228, 25.1147],
  '泰安': [117.0264, 36.0516],
  '泰州': [120.0586, 32.5525],
  '济南': [117.1582, 36.8701],
  '济宁': [116.8286, 35.3375],
  '海口': [110.3893, 19.8516],
  '淄博': [118.0371, 36.6064],
  '淮安': [118.927, 33.4039],
  '深圳': [114.5435, 22.5439],
  '清远': [112.9175, 24.3292],
  '温州': [120.498, 27.8119],
  '渭南': [109.7864, 35.0299],
  '湖州': [119.8608, 30.7782],
  '湘潭': [112.5439, 27.7075],
  '滨州': [117.8174, 37.4963],
  '潍坊': [119.0918, 36.524],
  '烟台': [120.7397, 37.5128],
  '玉溪': [101.9312, 23.8898],
  '珠海': [113.7305, 22.1155],
  '盐城': [120.2234, 33.5577],
  '盘锦': [121.9482, 41.0449],
  '石家庄': [114.4995, 38.1006],
  '福州': [119.4543, 25.9222],
  '秦皇岛': [119.2126, 40.0232],
  '绍兴': [120.564, 29.7565],
  '聊城': [115.9167, 36.4032],
  '肇庆': [112.1265, 23.5822],
  '舟山': [122.2559, 30.2234],
  '苏州': [120.6519, 31.3989],
  '莱芜': [117.6526, 36.2714],
  '菏泽': [115.6201, 35.2057],
  '营口': [122.4316, 40.4297],
  '葫芦岛': [120.1575, 40.578],
  '衡水': [115.8838, 37.7161],
  '衢州': [118.6853, 28.8666],
  '西宁': [101.4038, 36.8207],
  '西安': [109.1162, 34.2004],
  '贵阳': [106.6992, 26.7682],
  '连云港': [119.1248, 34.552],
  '邢台': [114.8071, 37.2821],
  '邯郸': [114.4775, 36.535],
  '郑州': [113.4668, 34.6234],
  '鄂尔多斯': [108.9734, 39.2487],
  '重庆': [107.7539, 30.1904],
  '金华': [120.0037, 29.1028],
  '铜川': [109.0393, 35.1947],
  '银川': [106.3586, 38.1775],
  '镇江': [119.4763, 31.9702],
  '长春': [125.8154, 44.2584],
  '长沙': [113.0823, 28.2568],
  '长治': [112.8625, 36.4746],
  '阳泉': [113.4778, 38.0951],
  '青岛': [120.4651, 36.3373],
  '韶关': [113.7964, 24.7028]
}
// 以西安为起点的 路线
var XAData = [
  [{name: '西安'}, {name: '北京', value: 100}],
  [{name: '西安'}, {name: '上海', value: 100}],
  [{name: '西安'}, {name: '广州', value: 100}]]
var color = ['#a6c84c', '#ffa022', '#46bee9'] // 航线的颜色
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
export default {
  name: 'bigScreen',
  data () {
    return {
      transferData: [],
      options: {
        border: true,
        shape: 'triangle'
      },
      items: ['列表第一项', '列表项目2', '这是第三条', '第四条信息'],
      speedVal: 3000
    }
  },
  mounted () {
    this.drawTransferMap(chinaOpt)
    // setInterval(() => {
    //   this.items = [11, 22, 3333]
    // }, 3000)
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
        var fromCoord = geoCoordMap[dataItem[0].name]
        var toCoord = geoCoordMap[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value
          })
        }
      }
      return res
    },
    drawTransferMap (opt) {
      var _this = this
      let charts = this.$echarts.init(document.getElementById('bigMap'))
      // 自定义地图
      this.$echarts.registerMap('china', JsonList[opt.name])
      var series = []
      var item = ['西安', XAData]
      series.push({
        name: item[0] + ' Top3',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },
        symbolSize: function (val) {
          return val[2] / 8
        },
        itemStyle: {
          normal: {
            color: color
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          }
        })
      }, {
        name: item[0],
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: 'red', // arrow箭头的颜色
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: color,
            width: 0,
            curveness: 0.2
          }
        },
        data: this.convertData(item[1])
      }, {
        name: item[0],
        type: 'lines',
        zlevel: 2,
        symbol: ['circle', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15
        },
        lineStyle: {
          normal: {
            color: color,
            width: 1,
            opacity: 0.6,
            curveness: 0.2
          }
        },
        data: this.convertData(item[1])
      })
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
              return '线路：' + params.data.name + '' + params.data.value[2]
            } else if (params.seriesType === 'lines') {
              return params.data.fromName + '>' + params.data.toName + ':' + params.data.value
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
        series: series
      }
      // 设置options前 清空画布，防止缓存
      charts.clear()
      charts.setOption(options)
      loopShowTooltip(charts, options, {loopSeries: false, seriesIndex: 0, interval: 5000})
      window.addEventListener('resize', function () {
        charts.resize()
      })
      charts.on('click', function (params) {
        var _self = this
        if (_this.checkCity(params.name) && opt.goDown) {
          _self.clear()
          // 关闭 点击事件 否则重复触发点击
          _self.off('click')
          _this.drawTransferMap(zhejiangOpt)
        } else if (!(_this.checkCity(params.name)) && !opt.goDown) {
          _self.clear()
          _self.off('click')
          _this.drawTransferMap(chinaOpt)
        } else {
          console.log('click budong')
        }
      })
      return charts
    }
  },
  beforeDestroy () {
    clearInterval(this.scrollvalid)
    this.scrollvalid = null
  }

}
</script>

<style scoped></style>
