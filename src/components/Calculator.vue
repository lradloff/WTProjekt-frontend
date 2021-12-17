<template>
  <div class = "p-3" style="max-width: 400px; margin: 0 auto; margin-top: 100px;
  background: #C9BBFF">

    <div class = "w-auto rounded m-1 p-3 text-end lead fw-bold text-black bg-light-purple">
      {{ screen || 0 }}
    </div>

    <div class="row g-0">
      <div class="col-3" v-for="n in calculatorButtons" :key="n">
        <div class="lead text-black text-center m-1 py-3 bg-light-purple rounded hover"
             :class="{'bg-dark-purple': ['AC','⌫','%','/','*','-','+','var','='].includes(n)}"
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
      equalsPressed: true,
      calculatorButtons: ['AC', '⌫', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 'var', 0, '.', '='],
    };
  },

  methods: {
    action(n) {
      if (n === 'AC') {
        this.clear();
        return;
      }

      if (n === '⌫') {
        if (this.screen.length === 1 || this.equalsPressed) {
          this.clear();
          return;
        }
        if (!(this.screen.endsWith('+') || this.screen.endsWith('-') || this.screen.endsWith('*') || this.screen.endsWith('/'))) {
          this.screen = this.screen.substring(0, this.screen.length - 1);
          this.currentValue = this.currentValue.substring(0, this.currentValue.length - 1);
        }
      }

      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'].includes(n)) {
        if (!((this.latestButton === '.') && (n === '.'))) {
          if (this.equalsPressed) {
            if (n === '.') {
              return;
            }
            this.clear();
            this.equalsPressed = false;
          }
          this.currentValue += `${n}`;
          this.screen += `${n}`;
          this.latestButton = n;
        }
      }

      if (['+', '-', '*', '/'].includes(n)) {
        if (['+', '-', '*', '/'].includes(this.latestButton)) {
          this.screen = this.screen.substring(0, this.screen.length - 1) + n;
          this.latestOperation = n;
        } else {
          if (this.latestOperation === '/') {
            this.prevValue /= parseFloat(this.currentValue);
          } else if (this.latestOperation === '-') {
            this.prevValue -= parseFloat(this.currentValue);
          } else if (this.latestOperation === '+') {
            this.prevValue += parseFloat(this.currentValue);
          } else if (this.latestOperation === '*') {
            this.prevValue *= parseFloat(this.currentValue);
          } else {
            this.prevValue = parseFloat(this.currentValue);
          }
          this.latestOperation = n;
          this.screen += `${n}`;
          this.currentValue = '';
          this.latestButton = n;
          this.equalsPressed = false;
        }
      }

      if (n === '=') {
        if (this.latestOperation === '+') {
          this.screen = (this.prevValue + parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '-') {
          this.screen = (this.prevValue - parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '*') {
          this.screen = (this.prevValue * parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '/') {
          this.screen = (this.prevValue / parseFloat(this.currentValue)).toString();
        }
        this.equalsPressed = true;
      }

      console.log(`currentValue: ${this.currentValue}`);
      console.log(`prevValue: ${this.prevValue}`);
      console.log(`latestOperation: ${this.latestOperation}`);
      console.log(`screen: ${this.screen}`);
      console.log(`latestButton: ${this.latestButton}`);
    },

    clear() {
      this.prevValue = '';
      this.currentValue = '';
      this.latestOperation = '';
      this.screen = '';
      this.latestButton = '';
      this.equalsPressed = true;
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
