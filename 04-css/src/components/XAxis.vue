<template>
  <g 
    :class="`axis x-axis-${id}`"
    :transform="`translate(0, ${yTranslate})`"
  >
  </g>
</template>

<script>
import { select, axisBottom } from 'd3'

export default {
  name: 'XAxis',
  props: {
    xScale: Function,
    yTranslate: Number,
    id: String,
  },
  mounted() {
    console.log(select(`.x-axis-${this.id}`))
    select(`.x-axis-${this.id}`)
      .call(axisBottom(this.xScale).ticks(10))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
