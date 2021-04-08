<template>
  <div class="iris">
    <Scatterplot 
      :points="filteredData"
      xVar="petal_length"
      yVar="sepal_length"
      keyVar="species"
      :getFill="colorScale"
      :onClick="value => setQueryParam('species', value)"
    />
    <h4 v-if="speciesFilter">Species: {{ speciesFilter }}</h4>
  </div>
</template>

<script>
import { csv, scaleOrdinal, schemeCategory10 } from 'd3';
// @ is an alias to /src
import Scatterplot from '@/components/Scatterplot.vue'

export default {
  name: 'Iris',
  components: {
    Scatterplot
  },
  props: {
    speciesFilter: String
  },
  created(){
    csv(
      "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv"
    )
      .then(data => {
        this.irisData = data;
      })
  },
  data(){
    return {
      irisData: []
    }
  },
  computed:{
    routeQuery(){
      return Object.entries(this.$route.query)
    },
    filteredData(){
      return this.irisData.filter(d => !this.speciesFilter || d.species === this.speciesFilter)
    },
    colorDomain(){
      return Array.from(
        new Set(
          this.irisData.map(d => d.species)
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
