<template>
  <svg 
    :height="height" 
    :width="width" 
    class="scatterplot"
  >
    <text 
        :y="margin/2" 
        :x="width/2" 
        class="center-align"
        @click="() => onClick(id.split('-'))"
    >
        {{xVar}} vs {{yVar}}
    </text>
    <g class="points">
      <LabeledPoint
        :key="point.key"
        v-for="point in points"
        :x="xScale(point[xVar])"
        :y="yScale(point[yVar])"
        :text="`(${point[xVar]}, ${point[yVar]})`"
        :r="5"
        :fill="getFill(point.species)"
      ></LabeledPoint>
    </g>
    <XAxis 
      :xScale="xScale" 
      :yTranslate="height - margin"
      :id="id"
    />
    <YAxis 
      :yScale="yScale"
      :xTranslate="margin"
      :id="id"
    />
 </svg>
</template>

<script>
import { max, scaleLinear } from 'd3';
import LabeledPoint from './LabeledPoint.vue';
import XAxis from './XAxis.vue';
import YAxis from './YAxis.vue';

export default {
    name: 'Scatterplot',
    components: {
        LabeledPoint,
        XAxis,
        YAxis
    },
    data() {
        return {
          margin: 30,
          width: 300,
          height: 200,
        }
    },
    props: {
        points: Array,
        xVar: String,
        yVar: String,
        getFill: Function,
        onClick: Function
    },
    computed: {
        id() {
            return `${this.xVar}-${this.yVar}`
        },
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
    }
}
</script>

<style scoped>
text {
    cursor: pointer;
}
.scatterplot {
    justify-self: center;
}

.center-align {
    text-anchor: middle;
}
</style>