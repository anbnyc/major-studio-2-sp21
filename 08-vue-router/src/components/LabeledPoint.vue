<template>
  <g 
    class="labeled-point"
    :transform="`translate(${x}, ${y})`"
  >
    <circle :r="r" :fill="fill"></circle>
    <text>{{ text }}</text>
  </g>
</template>

<script>
export default {
  name: 'LabeledPoint',
  props: {
    x: Number,
    y: Number,
    r: Number,
    fill: String,
    text: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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