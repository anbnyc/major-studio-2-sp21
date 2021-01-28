<template>
  <svg :height="height" :width="width">
    <LabeledPoint
      :key="point.key"
      v-for="point in points"
      :x="xScale(point[xVar])"
      :y="yScale(point[yVar])"
      :text="`(${point[xVar]}, ${point[yVar]})`"
      r="5"
    ></LabeledPoint>
    <XAxis />
    <YAxis />
  </svg>
</template>

<script>
import { max, scaleLinear, csv } from 'd3';
import LabeledPoint from './components/LabeledPoint.vue';
import XAxis from './components/XAxis.vue';
import YAxis from './components/YAxis.vue';

export default {
  name: 'App',
  created() {
    csv('https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv')
      .then(data => {
        const numColumns = data.columns.filter(d => d !== 'species');
        this.points = data.map((d, i) => {
          const point = { ...d, key: `${d.species}-${i}` };
          numColumns.forEach(col => point[col] = +d[col]);
          return point;
        });
      });
  },
  components: {
    LabeledPoint,
    XAxis,
    YAxis
  },
  computed: {
      xScale() {
          return scaleLinear()
            .domain([0, max(this.points, d => d[this.xVar])])
            .range([this.margin, this.width - this.margin])
      },
      yScale() {
          return scaleLinear()
            .domain([0, max(this.points, d => d[this.yVar])])
            .range([this.margin, this.height - this.margin])
      }
  },
  data() {
    return {
      points: [],
      xVar: "sepal_length",
      yVar: "petal_width",
      margin: 10,
      width: 300,
      height: 200
    }
  },
}
</script>

<style>

</style>
