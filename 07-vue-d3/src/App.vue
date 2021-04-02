<template>
  <h1>Vue vs D3</h1>
  <div class="filters">
      <el-checkbox-group v-model="filters">
        <el-checkbox label="1"></el-checkbox>
        <el-checkbox label="2"></el-checkbox>
        <el-checkbox label="3"></el-checkbox>
        <el-checkbox label="4"></el-checkbox>
        <el-checkbox label="5"></el-checkbox>
      </el-checkbox-group>
  </div>
  <div class="section"><VueOnly 
    :lotteries="filteredLotteries"
    :lottery_stats="lottery_stats"
  /></div>
  <div class="section"><VueD3Mixed 
    :lotteries="filteredLotteries"
    :lottery_stats="lottery_stats"
  /></div>
  <div class="section"><MostlyD3 
    :lotteries="filteredLotteries"
    :lottery_stats="lottery_stats"
  /></div>
  <!--<Modal :scrollPosition="scrollTop"></Modal>-->
</template>

<script>
import VueOnly from './components/VueOnly.vue'
import VueD3Mixed from './components/VueD3Mixed.vue'
import MostlyD3 from './components/MostlyD3.vue'
import Modal from './components/Modal.vue'

import * as d3 from 'd3'

export default {
  name: 'App',
  data(){
    return {
      lotteries: null,
      lottery_stats: null,
      scrollTop: 0,
      filters: ["1","2","3","4","5"]
    }
  },
  computed:{
    filteredLotteries(){
      if (!this.lotteries){
        return null
      }
      return this.lotteries.filter(d => this.filters.includes(d.Boro))
    }
  },
  components: {
    VueOnly,
    VueD3Mixed,
    MostlyD3,
    Modal
  },
  mounted(){
    Promise.all([
      d3.csv('housing_lotteries.csv'),
      d3.csv('lottery_income_household.csv')
    ])
      .then(data => {
        this.lotteries = data[0];
        this.lottery_stats = data[1];
      })
      
    window.addEventListener("scroll", this.onScroll)
  },
  unmounted() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    onScroll(/*event*/){
      // console.log(window.scrollY, event);
      this.scrollTop = window.scrollY;
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
  position: relative;
}

.section {
  height: 500px;
  border-bottom: 1px solid #888888;
}
</style>
