<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo2.jpg">
    <HelloWorld msg="deine olle fette mutter stintk du hundesohnn  hahahahaaha"/>
    <img alt="stfu" src="https://i.redd.it/jkikpfmulaj71.jpg">
    <video width="320" height="240" controls>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
