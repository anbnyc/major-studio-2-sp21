<template>
  <g 
    :class="`axis y-axis-${id}`"
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
    xTranslate: Number,
    id: String
  },
  updated() {
    select(`.y-axis-${this.id}`)
      .call(axisLeft(this.yScale))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>