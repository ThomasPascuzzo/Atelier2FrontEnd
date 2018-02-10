<template>
<div>
    <img :src="image">
    </img>
</div>

</template>
<script>
export default {
  name: "image-element",
  props : ['image'],
  data() {
    return {
    };
  },
 
  mounted() {

  },
  methods: {


      
    
  }
};
</script>

<style>
img {
width: 300px;
height: 200px;
}

</style>