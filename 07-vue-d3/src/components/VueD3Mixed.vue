<template>
    <div>
      <svg id="line-chart" :height="height" :width="width">
        <path class="line"></path>
        <g class="axis x-axis" :transform="`translate(0, ${height - margin})`"></g>
        <g class="axis y-axis" :transform="`translate(${margin}, 0)`"></g>
      </svg>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'VueD3Mixed',
  data(){
    return {
      width: 800,
      height: 400,
      margin: 50
    }
  },
  props: {
    lotteries: Array,
    lottery_stats: Array
  },
  computed: {
    lotteriesByDate(){
      if (!this.lotteries){
        return null;
      }
    
      return Array.from(d3.rollup(
        this.lotteries,
        values => values.reduce((acc, v) => {
          return {
            units: acc.units + Number(v["Number of Units"]),
            people: acc.people + Number(v["Eligible Household Size"])
          }
        }, {
          units: 0,
          people: 0
        }),
        d => d["OPEN APPLICATION PERIOD START"]
      )).sort((a,b) => d3.ascending(new Date(a[0]), new Date(b[0])))
    },
    xScale(){
      return d3.scaleTime()
        .domain(d3.extent(this.lotteriesByDate, d => new Date(d[0])))
        .range([this.margin, this.width - this.margin])
    },
    yScale(){
      return d3.scaleLinear()
        .domain(d3.extent(this.lotteriesByDate, d => d[1].units))
        .range([this.height - this.margin, this.margin])
    }
  },
  methods: {
    line(){
      return d3.line()
        .x(d => this.xScale(new Date(d[0])))
        .y(d => this.yScale(d[1].units))
    }
  },
  updated(){
    if (!this.lotteries){
      return;
    }
    d3.select('#line-chart')
      .select('path')
      .attr('d', () => {
        // console.log('here')
        return this.line()(this.lotteriesByDate)
      })
    
    const xAxis = d3.axisBottom(this.xScale)
    const yAxis = d3.axisLeft(this.yScale)
    d3.select('.x-axis')
      .call(xAxis)
    d3.select('.y-axis')
      .call(yAxis)
  }
}
</script>

<style>
#line-chart .line{
  fill: none;
  stroke: green;
  stroke-width: 2px;
}
</style>
