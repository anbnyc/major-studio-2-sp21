<template>
  <h2>P5 demonstration</h2>
  <div 
    v-for="color in circles"
    :key="color"
    class="checkbox"
    :style="{ backgroundColor: excludedColors.has(color) ? 'white' : color }"
    @click="toggleCircle(color)"
  ></div>
  <P5Container :circles="circles.filter(c => !excludedColors.has(c))" />
</template>

<script>
import P5Container from './components/P5Container.vue'

export default {
  name: 'App',
  components: {
    P5Container
  },
  data(){
    return { 
      circles: ['blue', 'green', 'red', 'yellow'],
      excludedColors: new Set()
    }
  },
  methods: {
    toggleCircle(color){
      if (this.excludedColors.has(color)) {
        this.excludedColors.delete(color)
      } else {
        this.excludedColors.add(color)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.checkbox {
  display: inline-block;
  height: 20px;
  width: 20px;
  border: 1px solid gray;
  margin: 5px;
  border-radius: 2px;
  box-shadow: 1px 1px 4px 2px #dddddd;
  cursor: pointer;
}
</style>
