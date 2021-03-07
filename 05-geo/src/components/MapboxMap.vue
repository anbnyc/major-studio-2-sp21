<template>
    <div id="mapbox-container"></div>
</template>
<script>
import mapboxgl from "mapbox-gl";
export default {
  name: 'MapboxMap',
  data() {
    return {
      mb: null
    }
  },
  props: {
    map: Object,
    colorScale: Function,
    colorVar: String,
    colorDomain: Array
  },
  computed: {
    mapboxFillColorSpec() {
      const spec = [
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
      return spec;
    }
  },
  watch: {
    colorVar: function(){
        this.mb.setPaintProperty('countries', 'fill-color', this.mapboxFillColorSpec);
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
        data: this.map
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
  }
}
</script>