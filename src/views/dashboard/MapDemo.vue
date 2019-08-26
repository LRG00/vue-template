<template>
  <div class="amap-page-container">
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    >
      <el-amap-marker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker.position"
        :events="marker.events"
      ></el-amap-marker>
      <el-amap-info-window style="width:400px;height:200px" v-if="window" :position="window.position" :visible="window.visible">
        <div style="width:400px;height:200px">
          <a-card title="快速开始 / 便捷导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card>
        </div>
      </el-amap-info-window>
    </el-amap>

    <div class="toolbar">
      <button @click="getMap()">get map</button>
    </div>
  </div>
</template>

<style>
.amap-page-container {
  height: 700px !important ;
}
.amap-demo {
  height: 700px;
}
</style>

<script>
// NPM 方式
import { AMapManager } from 'vue-amap'
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea } from '../../components/index'
// CDN 方式
const amapManager = new AMapManager()
export default {
  components: {
    ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea
  },
  data: function () {
    return {
      amapManager,
      zoom: 12,
      loading: false,
      count: 0,
      markers: [],
      windows: [],
      window: '',
      center: [121.59996, 31.197646],
      events: {
        init: o => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        moveend: () => {},
        zoomchange: () => {},
        click: () => {
          alert('map clicked')
        }
      },
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init (o) {
              console.log(o)
            }
          }
        }
      ]
    }
  },
  mounted () {
    const markers = []
    const windows = []

    const num = 10
    const self = this

    for (let i = 0; i < num; i++) {
      markers.push({
        position: [121.59996, 31.197646 + i * 0.02],
        events: {
          click () {
            self.windows.forEach(window => {
              window.visible = false
            })

            self.window = self.windows[i]
            self.$nextTick(() => {
              self.window.visible = true
            })
          }
        }
      })

      windows.push({
        position: [121.59996, 31.197646 + i * 0.02],
        content: `<div class="prompt">${i}</div>`,
        visible: false
      })
    }

    this.markers = markers
    this.windows = windows
  },
  methods: {
    onClick () {
      this.count += 1
    },
    getMap () {
      // amap vue component
      console.log(amapManager._componentMap)
      // gaode map instance
      console.log(amapManager._map)
    }
  }
}
</script>
<style lang="less">
    .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }
</style>
