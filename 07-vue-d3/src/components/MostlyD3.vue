<template>
  <div>
    <svg id="circle-chart">
      
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'MostlyD3',
  data(){
    return {
      width: 800,
      height: 400,
      counter: 0
    }
  },
  props: {
    lotteries: Array,
    lottery_stats: Array
  },
  computed: {
    lotteriesWithStats(){
      if (!this.lottery_stats){
        return null;
      }
      
      return this.lottery_stats.map(d => {
        const matchingLotteries = this.lotteries.filter(e => e["Lottery Number"] === d["LTTRY_PROJ_NO"])
        const aggregates = matchingLotteries.reduce((acc, v) => {
            return {
              numOfUnits: acc.numOfUnits + Number(v["Number of Units"]),
              householdSize: acc.householdSize + Number(v["Eligible Household Size"]),
              numberOfLotteries: acc.numberOfLotteries + 1
            }
          }, {
            numOfUnits: 0,
            householdSize: 0,
            numberOfLotteries: 0
          })
        return {
          ...d,
          lotteries: matchingLotteries,
          aggregates: aggregates
        }
      })
    },
    rScale(){
      return d3.scaleLinear()
        .domain(d3.extent(this.lotteriesWithStats, d => d.aggregates.numOfUnits))
        .range([5, 20])
    }
  },
  mounted(){
     d3.select('#circle-chart')
      .attr('height', this.height)
      .attr('width', this.width)
      .append('g')
      .attr('class', 'bubbles')
      .attr('transform', `translate(${this.width/2}, ${this.height/2})`)
      
    
  },
  updated(){
    const bubbleData = this.lotteriesWithStats
    
    const bubble = d3.select('.bubbles')
      .selectAll('circle')
      .data(bubbleData)
      .join('circle')
      .attr('class', 'bubble')
    
    bubble
      .attr('r', d => this.rScale(d.aggregates.numOfUnits))
      // .attr('cx', this.width/2)
      // .attr('cy', this.height/2)
      
    function tick() {
      bubble.attr("cx", d => d.x).attr("cy", d => d.y);
    }
      
    const center = [this.width / 2, this.height / 2];
    const simulation = d3.forceSimulation(bubbleData)
      .on("tick", tick)
      .force("collide", d3.forceCollide().radius(d => 1 + d.r))
      .force("x", d3.forceX(center[0]).strength(0.001))
      .force("y", d3.forceY(center[1]).strength(0.001))
      // .stop();
      
    simulation.restart();
  },
  methods: {
  }
}
</script>

<style>
.bubble {
  fill: none;
  stroke: blue;
  stroke-width: 1px;
}
</style>
