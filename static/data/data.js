export const chinaOpt = {
  name: 'china',
  goDown: true,
  level: 1,
  title: {
    text: '各省实时拦截情况'
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
    },
    {
      name: '中国',
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
    }]
  }
}
export const chinaData = [
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
export const chinaData1 = [
  // beijing 116.403613,39.916458
  // shanghai 121.470766,31.233706
  {
    d_city: '西安',
    d_latitude: 34.348938,
    d_longitude: 108.944165,
    s_city: '上海',
    s_latitude: 31.233706,
    s_longitude: 121.470766
  },
  // chengdu 104.073481,30.659054
  // xian 108.944165,34.348938
  {
    d_city: '西安',
    d_latitude: 34.348938,
    d_longitude: 108.944165,
    num: 233,
    s_city: '成都',
    s_latitude: 30.659054,
    s_longitude: 104.073481
  },
  {
    d_city: '西安',
    d_latitude: 34.348938,
    d_longitude: 108.944165,
    num: 233,
    s_city: '浙江',
    s_latitude: 30.26,
    s_longitude: 120.19
  }
]
export const zhejiangOpt = {
  name: 'zhejiang',
  goDown: false,
  level: 2,
  title: {
    text: '各市实时拦截情况'
  },
  geo: {
    center: [119.652866, 29.085903],
    zoom: 9,
    roam: true,
    scaleLimit: {min: 1},
    regions: {
      name: '浙江'
    }
  }
}
export const zhejiangData = [
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
export const zhejiangData1 = [
  {
    d_city: '杭州市',
    d_latitude: 30.287459,
    d_longitude: 120.153576,
    num: 2666,
    s_city: '宁波市',
    s_latitude: 29.868388,
    s_longitude: 121.549792
  }
]
export const radarData = [
  {
    value: [60,73,85,40],
    name: '四川'
  },
  {
    value: [10,23,62,70],
    name: '北京'
  },
  {
    value: [66,99,50,20],
    name: '天津'
  }
]
export const radarData1 = [
  {
    value: [60,73,85,40],
    name: '北京----'
  },
  {
    value: [10,23,62,70],
    name: '天津++++'
  },
  {
    value: [66,99,50,20],
    name: '四川-1-1-'
  }
]

// 拦截号段占比 数据
export const ljhdData = {
  data: [70, 34, 60, 78], // 占比
  titlename: ['950', '951', '057', '其他'], // 号段名称
  valdata: ['683.3w', '234w', '364w', '523w'], // 号段拦截次数
  myColor: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'] // 水平柱图颜色
}
// 开通用户数
export const ktusersData = {
  // 环比
  cicleVal: [1, 13, 37, 13, 25, 45, 32, 2, 4, 11],
  // 地点
  location: ['广州', '浙江', '江苏', '上海', '四川', '北京', '福建', '河南', '山东', '天津'],
  // 数值
  value: [209, 236, 439, 507, 879, 938, 1806, 1931, 2349, 2460]
}
// 呼叫/拦截情况
export const ljhjData = {
  // 呼叫次数
  calltimes: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46],
  // 拦截次数
  lanjietimes: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
  // 地点
  location: ['广州', '浙江', '江苏', '上海', '四川', '北京', '福建', '河南', '山东', '天津']
}
// 户均拦截次数 = 拦截次数 / 开通用户数
export const ljtimesForeach = {
  // 地点
  location: ['广州', '浙江', '江苏', '上海', '四川', '北京', '福建', '河南', '山东', '天津'],
  data: [
    [5000, 10000, 6785.71],
    [4000, 10000, 6825],
    [3000, 6500, 4463.33],
    [2500, 5600, 3793.83],
    [2000, 4000, 3060],
    [2000, 4000, 3222.33],
    [2500, 4000, 3133.33],
    [1800, 4000, 3100],
    [2000, 3500, 2750],
    [2000, 3000, 2500]
  ]
}
// 用户周拦截率
export const pictorialBarData = {
  // 总数
  // 拦截数值
  total: 2000,
  value: 1200
}
// 拦截次数最近7天日趋势
export const ljWeekData = {
  num: [948, 896, 941, 801, 524, 758, 947],
  time: ['04/30', '05/01', '05/02', '05/03', '05/04', '05/05', '05/06']
}