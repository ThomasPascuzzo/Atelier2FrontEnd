<template>
  <div>
   <h2>.  Timer : {{ tempsQuiPasse }} </h2>
  </div>
</template>

<script>
export default {
  name: 'timer-element',
  data () {
    return {
      timer: 60
    }
  },
  computed :{
    tempsQuiPasse() {
      return this.$store.state.time;
    }
  },
  methods: {
  },
 
}
</script>

<style scoped>
</style>
