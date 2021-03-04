<template>
<div class='App'>
  <div class="header">
    <div class="legend">
      Legend Here
    </div>
    <el-select v-model="colorVar" @change="setColorVar">
      <el-option
        v-for="v in colorVars"
        :key="v"
        :label="v"
        :selected="v === colorVar"
        :value="v"
      ></el-option>
    </el-select>
  </div>
  <el-divider></el-divider>
  <div class="maps">
    <el-card>
      <svg :height="height" :width="width">
        <g class="paths" @mouseleave="onHover(null)">
          <path
            v-for="feature in map.features"
            :key="feature.properties.geounit"
            :d="geoPath(feature)"
            :fill="colorScale(feature.properties[colorVar])"
            @mouseenter="onHover(feature.properties)"
          ></path>
        </g>
        <text id="hover" :x="50" :y="50"></text>
      </svg>
    </el-card>
    <el-card>
      <div id="mapbox-container"></div>
    </el-card>
  </div>
</div>
</template>

<script>
import * as d3 from "d3";
import mapboxgl from "mapbox-gl";
// import GeoJSON from './components/GeoJSON.vue';
import map from './africa.geo.json'

export default {
  name: 'App',
  components: {
    // GeoJSON
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
      mb: null
    }
  },
  mounted() {
    // https://dev.to/hmintoh/how-to-mapbox-with-vue-js-2a34
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

    this.mb = new mapboxgl.Map({
      container: "mapbox-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [18, 4],
      zoom: 2,
      maxBounds: [
        [-18, -40],
        [53, 40],
      ],
    });
    
    this.mb.on('load', () => {
      this.mb.addSource("countryPaths", {
        type: "geojson",
        data: map
      });
      
      this.mb.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countryPaths',
        paint: {
          "fill-opacity": 0.5,
          "fill-color": this.mapboxFillColorSpec
        }
      })
    })
  },
  computed: {
    projection() {
      return d3.geoEqualEarth()
        .center([18, 4])
        .scale(320)
        .translate([this.width/2, this.height/2]);
    },
    geoPath() {
      return d3.geoPath(this.projection);
    },
    colorDomain() {
      return Array.from(new Set(map.features.map(d => d.properties[this.colorVar])));
    },
    colorScale() {
      return d3.scaleOrdinal(d3.schemeBrBG[this.colorDomain.length])
        .domain(this.colorDomain)
    },
    mapboxFillColorSpec() {
      return [
        "to-color", [
          "at", 
          [
            "index-of", 
            [
              "get", 
              this.colorVar
            ],
            [
              "literal",
              this.colorDomain
            ]
          ], 
          [
            "literal", 
            this.colorScale.range()
          ]
        ]
      ]
    }
  },
  methods: {
    onHover(nextHover) {
      if (nextHover === null) {
        d3.select('#hover').text('')
        return;
      }
      const projectedCentroid = this.projection(nextHover.centroid)
      d3.select('#hover').text(nextHover.admin)
        .attr('x', projectedCentroid[0])
        .attr('y', projectedCentroid[1])
    },
    setColorVar() {
      this.mb.setPaintProperty('countries', 'fill-color', this.mapboxFillColorSpec)
    }
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
