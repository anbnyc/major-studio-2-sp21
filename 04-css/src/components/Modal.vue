<template>
  <div v-if="data.length" class="modal">
    <div class="modal-text modal-text-1">{{ text1 }}</div>
    <div class="modal-text modal-text-2">{{ text2 }}</div>
    <div class="child-viz"><slot></slot></div>
    <button @click="closeModal">Close</button>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    data: Array,
    closeModal: Function,
  },
  data() {
    return {
      text1: `Kitsch gentrify pug snackwave sustainable. Flexitarian photo booth occupy venmo. Hell of literally ugh, bushwick cred hoodie post-ironic master cleanse. Bitters bushwick cornhole hella, cardigan normcore wolf fingerstache squid vice fixie. Single-origin coffee sartorial butcher neutra organic tofu 8-bit.

            Letterpress tousled narwhal blog enamel pin tote bag messenger bag mustache blue bottle franzen man braid fingerstache asymmetrical biodiesel church-key. Kinfolk butcher activated charcoal tumeric, pickled scenester la croix subway tile raw denim gluten-free edison bulb deep v. Photo booth you probably haven't heard of them sriracha kitsch street art ethical. Schlitz tumeric irony, DIY iPhone street art letterpress ugh squid tbh keffiyeh.`,
      text2: `Bitters offal hashtag flexitarian bicycle rights direct trade raclette yr messenger bag locavore fixie unicorn enamel pin tumeric. Pitchfork beard stumptown gentrify franzen. Quinoa lomo neutra affogato, ugh tattooed dreamcatcher green juice roof party scenester trust fund cray. Yuccie shabby chic cold-pressed DIY. Single-origin coffee semiotics schlitz twee lomo, banh mi street art craft beer VHS 90's banjo lyft. Cronut kickstarter street art 90's PBR&B.

            Trust fund try-hard four dollar toast tote bag. Cloud bread venmo raclette schlitz. Ethical celiac viral taiyaki. Art party typewriter bitters direct trade portland iceland. Slow-carb twee post-ironic ugh, enamel pin tacos taiyaki shaman pitchfork hexagon. Austin poke celiac palo santo. Food truck drinking vinegar PBR&B, listicle locavore direct trade hoodie truffaut blue bottle.`,
    };
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 25vh;
  left: 25vw;
  right: 25vw;

  background-color: white;
  border: 1px solid gray;
  border-radius: 1px;
  box-shadow: 1px 1px 3px 1px gray;
  padding: 15px;

  height: 50vh;
  width: 50vw;

  display: grid;
  grid-template-columns: 300px 1fr 80px;
  grid-template-rows: 200px 1fr 20px;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
}

.child-viz {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.modal-text {
  font-size: 11px;
  font-family: Helvetica;
}
.modal-text-1 {
  /*grid-row: TODO / TODO;*/
  /*grid-column: TODO / TODO;*/
}
.modal-text-2 {
  /*grid-row: TODO / TODO;*/
  /*grid-column: TODO / TODO;*/
}

button {
  /*grid-row: TODO / TODO;*/
  /*grid-column: TODO / TODO;*/
}
</style>
