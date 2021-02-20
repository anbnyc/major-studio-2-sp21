<template>
  <div>
    <select @change="setXVar">
      <option 
        v-for="v in variables"
        :key="v"
        :label="v"
        :selected="v === xVar"
        :value="v"
      ></option>
    </select>
    <select @change="setYVar">
      <option
        v-for="v in variables"
        :key="v"
        :label="v"
        :selected="v === yVar"
        :value="v"
      ></option>
    </select>
  </div>
  <svg :height="height" :width="width">
    <g class="points">
      <LabeledPoint
        :key="point.key"
        v-for="point in points"
        :x="xScale(point[xVar])"
        :y="yScale(point[yVar])"
        :text="`(${point[xVar]}, ${point[yVar]})`"
        :r="5"
        :onHover="() => setHovered(point.species)"
        :resetHover="() => setHovered('')"
        :fill="getFill(point.species)"
      ></LabeledPoint>
    </g>
    <XAxis 
      :xScale="xScale" 
      :yTranslate="height - margin"
    />
    <YAxis 
      :yScale="yScale"
      :xTranslate="margin"
    />
  </svg>
</template>

<script>
import { max, scaleLinear, csv } from 'd3';
import LabeledPoint from './components/LabeledPoint.vue';
import XAxis from './components/XAxis.vue';
import YAxis from './components/YAxis.vue';

const COLOR_ARRAY = ['#ff8800', '#dd44dd', '#00dd88'];

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
        this.species = Array.from(new Set(data.map(d => d.species)));
        this.variables = numColumns
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
            .range([this.height - this.margin, this.margin])
      }
  },
  data() {
    return {
      points: [],
      xVar: "sepal_length",
      yVar: "petal_width",
      margin: 30,
      width: 300,
      height: 200,
      species: [],
      hovered: '',
      variables: []
    }
  },
  methods: {
    setHovered(nextHovered) {
      this.hovered = nextHovered;
    },
    getFill(species) {
      if (species === this.hovered) {
        const index = this.species.indexOf(species);
        return COLOR_ARRAY[index]
      }
      return 'black'
    },
    setXVar(event) {
      this.xVar = event.target.value
    },
    setYVar(event) {
      this.yVar = event.target.value
    }
  }
}
</script>

<style>

</style>
