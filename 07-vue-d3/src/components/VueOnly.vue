<template>
    <div class="VueOnly">
      <div 
        v-for="key in Array.from(lotteriesByBorough.keys())"
        class="horizontal-group"
      >
        <div class="horizontal-text">{{key}}</div>
        <div 
          class="horizontal-bar"
          :style="{ width: xScale(lotteriesByBorough.get(key)) + 'px' }"
        ></div>
      </div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'VueOnly',
  data(){
    return {
      
    }
  },
  props: {
    lotteries: Array,
    lottery_stats: Array
  },
  computed: {
    lotteriesByBorough() {
      if (!this.lotteries) {
        return new Map()
      }
      return d3.rollup(
        this.lotteries, 
        values => d3.mean(values.map(d => +d["Rent"])),
        d => d["Boro"]
      )
    },
    rentExtent() {
      return d3.extent(Array.from(this.lotteriesByBorough.values()))
    },
    xScale(){
      return d3.scaleLinear()
        .domain([0, this.rentExtent[1]])
        .range([50, window.innerWidth - 10])
    }
  },
  methods: {
  }
}
</script>

<style>
.horizontal-group{
  display: block;
  position: relative;
}
.horizontal-text{
  position: absolute;
  left: 0px;
  color: white;
}
.horizontal-bar{
  /*display: inline-block;*/
  height: 20px;
  background-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>
