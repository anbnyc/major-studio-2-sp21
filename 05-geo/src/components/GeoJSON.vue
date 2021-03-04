<template>
  <svg>

  </svg>
</template>

<script>
export default {
  name: 'GeoJSON',
  props: {
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
