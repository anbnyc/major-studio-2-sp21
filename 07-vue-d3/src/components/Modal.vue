<template>
  <div class="Modal">
      <div>Scroll-Y is {{scrollPosition}}</div>
      <div>Rounded to the nearest 100: {{scrollBlock}}</div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: {
      scrollPosition: Number
  },
  computed: {
      scrollBlock(){
          return Math.floor(this.scrollPosition / 100)
      }
  }
}
</script>

<style>
.Modal{
    position: fixed;
    top: 25vh;
    left: 25vw;
    width: 50vw;
    height: 50vh;
    opacity: 0.5;
    border: 1px solid #dddddd;
    padding: 10px;
}
</style>
