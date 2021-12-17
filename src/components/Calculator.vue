<template>
  <div class="container">

    <div class="row">

      <div class="col">

        <div class = "p-3" style="max-width: 400px; margin: 0 auto; margin-top: 100px;
  background: #C9BBFF">

          <div class = "w-auto rounded m-1 p-3 text-end lead fw-bold text-black bg-light-purple">
            {{ screen || '-' }}
          </div>

          <div class="row g-0">
            <div class="col-3" v-for="n in calculatorButtons" :key="n">
              <div class="lead text-black text-center m-1 py-3 bg-light-purple rounded hover"
                   :class="{'bg-dark-purple': ['AC','⌫','%','/','*','-','+','var','=']
                   .includes(n)}" @click="action(n)">
                {{ n }}
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class = "col" style="margin-top: 100px;">
        <ul class="list-group">
          <li class="list-group-item" v-for="rechnung in rechnungen" :key="rechnung.id"
              v-on:click="updateHistory">
            ID: {{ rechnung.id }} ||| {{ rechnung.rechnung }} = {{ rechnung.ergebnis }}
            ||| {{ rechnung.datum }}
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
    const today = new Date();
    return {
      rechnungen: [],

      datum: `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`,
      screen: '',
      currentValue: '',
      prevValue: '',
      latestOperation: null,
      latestButton: '',
      equalsPressed: true,
      dotPressed: false,
      rechenString: '',
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
        if (!(['+', '-', '*', '/'].includes(this.screen.slice(-1)))) {
          if (this.screen.slice(-1) === '.') {
            this.dotPressed = false;
          }
          this.screen = this.screen.substring(0, this.screen.length - 1);
          this.currentValue = this.currentValue.substring(0, this.currentValue.length - 1);
        }
      }

      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'].includes(n)) {
        if (this.equalsPressed) {
          this.clear();
          this.equalsPressed = false;
        }
        if (n === '.') {
          if (this.dotPressed) {
            return;
          }
          this.dotPressed = true;
        }
        this.currentValue += `${n}`;
        this.screen += `${n}`;
        this.latestButton = n;
      }

      if (['+', '-', '*', '/'].includes(n)) {
        if (this.screen === 'ERROR' || this.screen === '') {
          this.clear();
          return;
        }
        if (['+', '-', '*', '/'].includes(this.latestButton)) {
          this.screen = this.screen.substring(0, this.screen.length - 1) + n;
          this.latestOperation = n;
        } else {
          if (this.latestOperation === '/') {
            this.prevValue = (parseFloat(this.prevValue) / parseFloat(this.currentValue))
              .toString();
          } else if (this.latestOperation === '-') {
            this.prevValue = (parseFloat(this.prevValue) - parseFloat(this.currentValue))
              .toString();
          } else if (this.latestOperation === '+') {
            this.prevValue = (parseFloat(this.prevValue) + parseFloat(this.currentValue))
              .toString();
          } else if (this.latestOperation === '*') {
            this.prevValue = (parseFloat(this.prevValue) * parseFloat(this.currentValue))
              .toString();
          } else {
            this.prevValue = parseFloat(this.currentValue).toString();
          }
          this.latestOperation = n;
          this.screen += `${n}`;
          this.currentValue = '';
          this.latestButton = n;
          this.equalsPressed = false;
          this.dotPressed = false;
        }
      }

      if (n === '=') {
        this.rechenString = this.screen;
        if (this.latestOperation === '+') {
          this.screen = (parseFloat(this.prevValue) + parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '-') {
          this.screen = (parseFloat(this.prevValue) - parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '*') {
          this.screen = (parseFloat(this.prevValue) * parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '/') {
          this.screen = (parseFloat(this.prevValue) / parseFloat(this.currentValue)).toString();
        }
        if (this.screen.startsWith('.') && this.screen.length > 1) {
          this.screen = `0${this.screen}`;
        }
        this.equalsPressed = true;
        this.dotPressed = false;
        if (this.screen === 'NaN' || this.screen === '.') {
          this.clear();
          this.screen = 'ERROR';
        } else {
          this.post();
          setTimeout(this.updateHistory, 200);
        }
      }

      if (n === '%') {
        return;
      }
      console.log(`currentValue: ${this.currentValue}`);
      console.log(`prevValue: ${this.prevValue}`);
      console.log(`latesOperation: ${typeof this.latestOperation}`);
      console.log(`screen: ${typeof this.screen}`);
      console.log(`rechenString: ${typeof this.rechenString}`);
      console.log((parseFloat('0.03') + parseFloat('0.06')).toFixed(2));
      console.log((parseFloat('0.00003') + parseFloat('0.03')).toFixed(5));
    },

    clear() {
      this.prevValue = '';
      this.currentValue = '';
      this.latestOperation = '';
      this.screen = '';
      this.latestButton = '';
      this.equalsPressed = true;
      this.dotPressed = false;
      this.rechenString = '';
    },

    post() {
      const data = { rechnung: this.rechenString, datum: this.datum, ergebnis: this.screen };
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/rechnungen`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch(endpoint, requestOptions)
        .then((text) => { console.log(text); })
        .catch((error) => console.log('Error:', error));
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
        .catch((error) => console.log('Error:', error));
    },

  },
};
</script>

<style scoped>
.list-group{
  max-height: 452px;
  overflow-y:scroll;
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
.container {
  user-select: none;
}
</style>
