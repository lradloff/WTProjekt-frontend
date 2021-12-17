<template>
  <div class="container">

    <div class="row">

      <div class="col">

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

      </div>

      <div class = "col" style="margin-top: 100px">
        <ul class="list-group">
          <li class="list-group-item" v-for="rechnung in rechnungen" :key="rechnung.id">
            ID: {{ rechnung.id }} ||| {{ rechnung.rechnung }} ||| Datum: {{ rechnung.datum }} |||
            Ergebnis: {{ rechnung.ergebnis }}
          </li>
        </ul>
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

  mounted() {
    this.updateHistory();
  },

  data() {
    return {
      rechnungen: [],

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

      if (n === '%') {
        this.post();
        setTimeout(this.updateHistory, 100);
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

    post() {
      const data = { rechnung: '1+1', datum: '2021-03-03' };
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/rechnungen`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log('error', error));
    },

    updateHistory() {
      this.rechnungen = [];
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/rechnungen`;
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => result.forEach((rechnung) => {
          this.rechnungen.push(rechnung);
        }))
        .catch((error) => console.log('error', error));
    },

  },
};
</script>

<style scoped>
.list-group{
  max-height: 469px;
  overflow:scroll;
}
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
