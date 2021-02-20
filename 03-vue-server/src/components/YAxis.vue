<template>
  <g 
    class="axis y-axis"
    :transform="`translate(${xTranslate}, 0)`"
  >
  </g>
</template>

<script>
import { select, axisLeft } from 'd3'

export default {
  name: 'YAxis',
  props: {
    yScale: Function,
    xTranslate: Number
  },
  updated() {
    select('.y-axis')
      .call(axisLeft(this.yScale).ticks(10))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
