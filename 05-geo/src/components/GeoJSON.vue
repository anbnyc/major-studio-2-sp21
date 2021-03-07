<template>
  <svg :height="height" :width="width">
    <g class="paths" @mouseleave="onHover(null)">
      <path
        v-for="feature in features"
        :key="feature.properties.geounit"
        :d="geoPath(feature)"
        :fill="colorScale(feature.properties[colorVar])"
        @mouseenter="onHover(feature.properties)"
      ></path>
    </g>
    <text id="hover" :x="50" :y="50">
      <tspan id="hover-1"  :dy="10"></tspan>
      <tspan id="hover-2"  :dy="20"></tspan>
    </text>
  </svg>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'GeoJSON',
  props: {
    height: Number,
    width: Number,
    features: Array,
    colorScale: Function,
    colorVar: String
  },
  computed: {
    projection() {
      return d3.geoEquirectangular()
        .center([18, 4])
        .scale(320)
        .translate([this.width/2, this.height/2]);
    },
    geoPath() {
      return d3.geoPath(this.projection);
    },
  },
  methods: {
    onHover(nextHover) {
      if (nextHover === null) {
        d3.select('#hover').selectAll('tspan').text('')
        return;
      }
      const projectedCentroid = this.projection(nextHover.centroid)
      const hover = d3.select('#hover')
        .attr('x', projectedCentroid[0])
        .attr('y', projectedCentroid[1])
      hover.select('#hover-1')
        .attr('x', projectedCentroid[0])
        .text(nextHover.admin)
      hover.select('#hover-2')
        .attr('x', projectedCentroid[0])
        .text(nextHover[this.colorVar])
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hover-2 {
  font-size: 12px;
}
.labeled-point text {
  opacity: 0;
  pointer-events: none;
}
.labeled-point:hover text {
  opacity: 1;
}
circle {
  stroke: black;
  stroke-width: 1px;
  opacity: 0.5;
}
</style>
