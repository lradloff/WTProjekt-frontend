<template>
  <div class = "p-3" style="max-width: 400px; margin-top: 100px; margin-left: 300px;
  background: #C9BBFF">

    <div class = "w-full rounded m-1 p-3 text-end lead font-weight-bold text-black bg-light-purple">
      {{ displayValue || 0 }}
    </div>

  </div>
</template>

<script>
export default {
  name: 'Calculator',
  props: {
    msg: String,
  },

  data() {
    return {
      displayValue: '',
    };
  },

};
</script>

<style scoped>
.bg-light-purple {
  background: #E6DFFF;
}
</style>
