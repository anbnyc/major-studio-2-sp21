<template>
  <div>
    <Header
      :setColor="setColor"
      :colors="colorArray"
      :species="species"
    ></Header>
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
  </div>
</template>

<script>
import { cross, csv } from "d3";
import Header from "./components/Header.vue";
import Scatterplot from "./components/Scatterplot.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  created() {
    csv(
      "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv"
    ).then((data) => {
      const numColumns = data.columns.filter((d) => d !== "species");
      this.points = data.map((d, i) => {
        const point = { ...d, key: `${d.species}-${i}` };
        numColumns.forEach((col) => (point[col] = +d[col]));
        return point;
      });
      this.species = Array.from(new Set(data.map((d) => d.species)));
      this.variables = numColumns;
    });
  },
  data() {
    return {
      points: [],
      species: [],
      variables: [],
      modalData: [],
      colorArray: ["#ff8800", "#dd44dd", "#00dd88"],
    };
  },
  components: {
    Scatterplot,
    Modal,
    Header,
  },
  computed: {
    getFill() {
      return (species) => {
        const index = this.species.indexOf(species);
        return index >= 0 ? this.colorArray[index] : "black";
      };
    },
    variableCombinations() {
      return cross(this.variables, this.variables);
      // .filter(d => d[0] !== d[1])
    },
  },
  methods: {
    setModalData(data) {
      this.modalData = data;
    },
    setColor(index, value) {
      if (index > this.colorArray.length) {
        return;
      }
      this.colorArray[index] = value;
    },
  },
};
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

/*@media (max-width:TODOpx) and (min-width:TODOpx) {*/
/*  .viz {*/
/*    grid-template-rows: repeat(6, 1fr);*/
/*    grid-template-columns: repeat(3, 1fr);*/
/*  }*/
/*}*/

/*@media (max-width:TODOpx) and (min-width:TODOpx) {*/
/*  .viz {*/
/*    grid-template-rows: repeat(8, 1fr);*/
/*    grid-template-columns: repeat(2, 1fr);*/
/*  }*/
/*}*/

/*@media (max-width: TODOpx) {*/
/*  .viz {*/
/*    grid-template-columns: 1fr;*/
/*  }*/
/*}*/
</style>
