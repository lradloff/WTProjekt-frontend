<template>
  <div class = "p-3" style="max-width: 400px; background: #C9BBFF">

    <div class = "w-auto rounded m-1 p-3 text-end lead fw-bold text-black bg-light-purple">
      {{ displayValue || 0 }}
    </div>

    <div class="row g-0">
      <div class="col-3" v-for="n in calculatorButtons" :key="n">
        <div class="lead text-black text-center m-1 py-3 bg-light-purple rounded hover"
             :class="{'bg-dark-purple': ['AC','?','%','/','*','-','+','var','='].includes(n)}"
             @click="action(n)"
        >
          {{ n }}
        </div>
      </div>
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
      prevValue: 0,
      latestOperation: '',
      calculatorButtons: ['AC', '?', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 'var', 0, '.', '='],
    };
  },

  methods: {
    action(n) {
      console.log(n);

      if (n === 'AC') {
        this.prevValue = 0;
        this.displayValue = '';
        return;
      }

      if (n === '+') {
        this.prevValue += n;
      }

      this.displayValue += `${n}`;
    },
  },
};
</script>

<style scoped>
.bg-light-purple {
  background: #E6DFFF;
}
.hover:hover {
  cursor: pointer;
  background: #F4F1FF;
}
.bg-dark-purple {
  background: #A696EC;
}
</style>
