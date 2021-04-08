<template>
  <div class="cars">
    <Scatterplot 
      :points="filteredData"
      xVar="mpg"
      yVar="hp"
      keyVar="make"
      :getFill="colorScale"
      :onClick="value => setQueryParam('make', value)"
    />
    <h4 v-if="makeFilter">Make: {{ makeFilter }}</h4>
  </div>
</template>

<script>
import Scatterplot from '@/components/Scatterplot.vue'
import { csv, scaleOrdinal, schemeCategory10 } from 'd3'

export default {
  name: 'Cars',
  components: {
    Scatterplot
  },
  props: {
    makeFilter: String
  },
  created(){
    csv(
      "https://gist.githubusercontent.com/seankross/a412dfbd88b3db70b74b/raw/5f23f993cd87c283ce766e7ac6b329ee7cc2e1d1/mtcars.csv"
    )
      .then(data => {
        this.carsData = data.map(d => {
          return {
            ...d,
            make: d.model.split(' ')[0]
          }
        });
      })
  },
  data(){
    return {
      carsData: []
    }
  },
  computed:{
    routeQuery(){
      return Object.entries(this.$route.query)
    },
    filteredData(){
      return this.carsData.filter(d => !this.makeFilter || d.make === this.makeFilter)
    },
    colorDomain(){
      return Array.from(
        new Set(
          this.carsData.map(d => d.make)
        )
      )
    },
    colorScale(){
      return scaleOrdinal(schemeCategory10)
        .domain(this.colorDomain)
    }
  },
  methods: {
    setQueryParam(key, value){
      this.$router.push({ query: { [key]: value } })
    }
  }
}
</script>