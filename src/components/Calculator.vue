<template>
  <div class = "p-3" style="max-width: 400px; margin: 0 auto; margin-top: 100px;
  background: #C9BBFF">

    <div class = "w-auto rounded m-1 p-3 text-end lead fw-bold text-black bg-light-purple">
      {{ screen || 0 }}
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
      screen: '',
      currentValue: '',
      prevValue: '',
      latestOperation: null,
      latestButton: '',
      calculatorButtons: ['AC', '?', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 'var', 0, '.', '='],
    };
  },

  methods: {
    action(n) {
      console.log();

      if (n === 'AC') {
        this.prevValue = '';
        this.currentValue = '';
        this.latestOperation = '';
        this.screen = '';
        this.latestButton = '';
        return;
      }

      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'].includes(n)) {
        this.currentValue += `${n}`;
        this.screen += `${n}`;
        this.latestButton = n;
      }

      if (['+', '-', '*', '/'].includes(n)) {
        if (this.latestOperation === '/') {
          this.prevValue /= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '-') {
          this.prevValue -= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '+') {
          this.prevValue += parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '*') {
          this.prevValue *= parseInt(this.currentValue, 10);
        } else {
          this.prevValue = parseInt(this.currentValue, 10);
        }
        this.latestOperation = n;
        this.screen += `${n}`;
        this.currentValue = '';
      }

      /*  if (n === '+') {
        if (this.latestOperation === '+') {
          this.prevValue += parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '-') {
          this.prevValue -= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '*') {
          this.prevValue *= parseInt(this.currentValue, 10);
        } else {
          this.prevValue = parseInt(this.currentValue, 10);
        }
        this.latestOperation = '+';
        this.screen += `${n}`;
        this.currentValue = '';
      }

      if (n === '-') {
        if (this.latestOperation === '-') {
          this.prevValue -= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '+') {
          this.prevValue += parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '*') {
          this.prevValue *= parseInt(this.currentValue, 10);
        } else {
          this.prevValue = parseInt(this.currentValue, 10);
        }
        this.latestOperation = '-';
        this.screen += `${n}`;
        this.currentValue = '';
      }

      if (n === '*') {
        if (this.latestOperation === '*') {
          this.prevValue *= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '-') {
          this.prevValue -= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '+') {
          this.prevValue += parseInt(this.currentValue, 10);
        } else {
          this.prevValue = parseInt(this.currentValue, 10);
        }
        this.latestOperation = '*';
        this.screen += `${n}`;
        this.currentValue = '';
      }

      if (n === '/') {
        if (this.latestOperation === '/') {
          this.prevValue /= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '-') {
          this.prevValue -= parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '+') {
          this.prevValue += parseInt(this.currentValue, 10);
        } else if (this.latestOperation === '*') {
          this.prevValue *= parseInt(this.currentValue, 10);
        } else {
          this.prevValue = parseInt(this.currentValue, 10);
        }
        this.latestOperation = '*';
        this.screen += `${n}`;
        this.currentValue = '';
      } */

      if (n === '=') {
        if (this.latestOperation === '+') {
          this.screen = this.prevValue + parseInt(this.currentValue, 10);
        }
        if (this.latestOperation === '-') {
          this.screen = this.prevValue - parseInt(this.currentValue, 10);
        }
        if (this.latestOperation === '*') {
          this.screen = this.prevValue * parseInt(this.currentValue, 10);
        }
        if (this.latestOperation === '/') {
          this.screen = this.prevValue / parseInt(this.currentValue, 10);
        }
      }

      console.log(`currentValue: ${this.currentValue}`);
      console.log(`prevValue: ${this.prevValue}`);
      console.log(`latestOperation: ${this.latestOperation}`);
      console.log(`screen: ${this.screen}`);
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
