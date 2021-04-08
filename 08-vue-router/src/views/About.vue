<template>
  <div class="about">
    <h1>This is an about page</h1>
    <AboutContent />
  </div>
</template>

<script>
import AboutContent from '@/components/AboutContent.vue'

export default {
  name: 'About',
  components: {
    AboutContent
  }
}
</script>