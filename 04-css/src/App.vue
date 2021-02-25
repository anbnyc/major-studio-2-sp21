<template>
  <h3>Small multiples with CSS Grid</h3>
  <div class="viz">
    <Scatterplot
      v-for="combo in variableCombinations"
      :points="points"
      :xVar="combo[0]"
      :yVar="combo[1]"
      :getFill="getFill"
      :key="`${combo[0]}-${combo[0]}`"
      :onClick="setModalData"
    >
    </Scatterplot>
  </div>
  <Modal :data="modalData" :closeModal="() => setModalData([])">
    <Scatterplot
      :points="points"
      :xVar="modalData[0]"
      :yVar="modalData[1]"
      :getFill="getFill"
      :onClick="setModalData"
    >
    </Scatterplot>
  </Modal>
</template>

<script>
import { cross, csv } from 'd3';
import Scatterplot from './components/Scatterplot.vue'
import Modal from './components/Modal.vue'

const COLOR_ARRAY = ['#ff8800', '#dd44dd', '#00dd88'];

export default {
  name: 'App',
  created() {
    csv('https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv')
      .then(data => {
        const numColumns = data.columns.filter(d => d !== 'species');
        this.points = data.map((d, i) => {
          const point = { ...d, key: `${d.species}-${i}` };
          numColumns.forEach(col => point[col] = +d[col]);
          return point;
        });
        this.species = Array.from(new Set(data.map(d => d.species)));
        this.variables = numColumns
      });
  },
  data() {
    return {
      points: [],
      species: [],
      variables: [],
      modalData: []
    }
  },
  components: {
    Scatterplot,
    Modal
  },
  computed: {
    getFill() {
      return species => {
        const index = this.species.indexOf(species);
        return index >= 0 ? COLOR_ARRAY[index] : 'black'
      }
    },
    variableCombinations() {
      return cross(this.variables, this.variables)
        // .filter(d => d[0] !== d[1])
    }
  },
  methods: {
    setModalData(data) {
      this.modalData = data
    }
  }
}
</script>

<style>
#app {
  position: relative;
}
.viz {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width:1199px) and (min-width:900px) {
  .viz {
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width:899px) and (min-width:600px) {
  .viz {
    grid-template-rows: repeat(8, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 599px) {
  .viz {
    grid-template-columns: 1fr;
  }
}
</style>
