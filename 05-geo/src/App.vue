<template>
<div class='App'>
  <div class="header">
    <el-select v-model="colorVar">
      <el-option
        v-for="v in colorVars"
        :key="v"
        :label="v"
        :selected="v === colorVar"
        :value="v"
      ></el-option>
    </el-select>
    <div class="legend">
      <div
        v-for="color in colorDomain"
        class="legend-item"
        :key="color"
      >
        <div
          class="legend-item-color"
          :style="{ backgroundColor: colorScale(color) }"
        ></div>
        <div
          class="legend-item-text"
        >{{ color }}</div>
      </div>
    </div>
  </div>
  <el-divider></el-divider>
  <div class="maps">
    <el-card>
      <GeoJSON 
        :height="height"
        :width="width"
        :features="map.features"
        :colorScale="colorScale"
        :colorVar="colorVar"
      />
    </el-card>
    <el-card>
      <MapboxMap 
        :map="map"
        :colorScale="colorScale"
        :colorDomain="colorDomain"
        :colorVar="colorVar"
      />
    </el-card>
  </div>
</div>
</template>

<script>
import * as d3 from "d3";
import GeoJSON from './components/GeoJSON.vue';
import MapboxMap from './components/MapboxMap.vue';
import map from './africa.geo.json'

export default {
  name: 'App',
  components: {
    GeoJSON,
    MapboxMap
  },
  data() {
    return {
      map: { 
        ...map, 
        features: map.features.map(f => ({ 
          ...f, 
          properties: {
            ...f.properties,
            centroid: d3.geoCentroid(f)
          }
        }))
      },
      colorVar: 'economy',
      colorVars: ['economy', 'income_grp', 'subregion'],
      width: 400,
      height: 500,
    }
  },
  mounted() {
    
  },
  computed: {
    colorDomain() {
      return Array.from(new Set(map.features.map(d => d.properties[this.colorVar]))).sort();
    },
    colorScale() {
      return d3.scaleOrdinal(d3.schemeBrBG[this.colorDomain.length])
        .domain(this.colorDomain)
    },
  },
  methods: {
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
  .App {
    display: flex;
    flex-direction: column;
  }
  .header {
    padding: 10px;
    display: flex;
  }
  .legend {
    margin: 10px;
    display: flex;
  }
  .legend-item {
    margin-right: 10px;
  }
  .legend-item-color {
    height: 20px;
    width: 20px;
    display: inline-block;
  }
  .legend-item-text {
    margin: 5px;
    display: inline-block;
    vertical-align: bottom;
    font-size: 12px;
  }
  .maps {
    display: flex;
    justify-content: space-around;
  }
  #mapbox-container {
    height: 500px;
    width: 400px;
  }
  text {
    transition: fill-opacity 0.5s;
    font-size: 12pt;
    text-anchor: middle;
    pointer-events: none;
  }
  path {
    fill-opacity: 0.8;
    stroke: black;
  }
  path:hover {
    fill-opacity: 1;
  }
</style>
